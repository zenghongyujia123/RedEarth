/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaLastMonthCtrl', ['$scope', '$rootScope', '$state', 'AreaOrderService', 'Loading', 'ExcelReaderService',
    function ($scope, $rootScope, $state, AreaOrderService, Loading, ExcelReaderService) {
        $scope.$emit('suggest.import.changed', {
            title: '建议订单',
            btns: [
                {
                    text: '导入上月销售,库存,在途',
                    clickCallback: salesClickCallback
                },
                {
                    text: '导出',
                    clickCallback: exportExecl
                }
            ]
        });

        $scope.sales = [];
        $scope.getSalesByArea = function () {
            Loading.show();
            AreaOrderService.getSalesByArea().then(function (data) {
                if (!data.err) {
                    $scope.sales = data;
                }
                Loading.hide();
                console.log(data);
            }, function (data) {
                Loading.hide();
                console.log(data);
            });
        };
        $scope.getSalesByArea();

        function salesClickCallback() {
            var headers = [
                {key: 'A1', value: 'SKU编码'},
                {key: 'B1', value: '上月销售量'},
                {key: 'C1', value: '上月月结库存量'},
                {key: 'D1', value: '上月月结在途量'}
            ];

            function upload(saleses, i) {
                AreaOrderService.areaSalesStockOnwayImport(saleses[i++])
                    .then(function (data) {
                        if (data && data.err && data.err.type === 'product_not_exist') {
                            alert(data.err.message);
                            return $state.go('order_suggest.suggest_area_last_month', {}, {reload: true});
                        }

                        console.log(data);
                        if (saleses[i]) {
                            upload(saleses, i);
                        }
                        else {
                            Loading.hide();
                            $state.go('order_suggest.suggest_area_last_month', {}, {reload: true});
                        }
                    }, function (err) {
                        Loading.hide();
                        console.log(err);
                    });
            }

            $scope.areaSalesStockOnwayImport = function (saleses) {
                Loading.show();
                var i = 0;
                upload(saleses, i);
            };

            $rootScope.$broadcast('show.dialogUpload', {
                title: '上传销量库存在途量',
                contents: [{
                    key: '请选择需要上传的销量库存在途量文件',
                    value: '点击选择文件',
                    tip: '点击选择文件',
                    sheetName: '分区'
                }],
                color: 'blue',
                headers: headers,
                callback: function (data) {
                    var result = [];
                    data.forEach(function (item) {
                        result.push({
                            product_number: item['SKU编码'],
                            last_month_sales_count: item['上月销售量'],
                            last_month_stock_count: item['上月月结库存量'],
                            last_month_onway_count: item['上月月结在途量'],
                        });
                    });
                    var sales = [];
                    for (var i = 0, len = result.length; i < len; i += 100) {
                        sales.push(result.slice(i, i + 100));
                    }
                    if (sales.length > 0) {
                        $scope.areaSalesStockOnwayImport(sales);
                    }
                    console.log(sales);
                }
            });
        }

        $scope.exportExcel = function () {
            var execlReader = ExcelReaderService.getReader();
            var rows = [[
                'SKU编码',
                '产品名称',
                '上月月结库存',
                '上月月结在途',
                '上1个月销售量',
                '上2个月销售量',
                '上3个月销售量'
            ]];

            $scope.sales.forEach(function (o) {
                rows.push([
                    o.product_number,
                    o.product.product_name,
                    o.last_month_stock_count,
                    o.last_month_onway_count,
                    o.last_month_sales_count,
                    o.last_month_sales_count_2 || '未知',
                    o.last_month_sales_count_3 || '未知'
                ]);
            });

            execlReader.exportExcel(rows);
        };

        function exportExecl() {
            $scope.exportExcel();
        }


    }]);