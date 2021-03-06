/**
 * Created by zenghong on 16/1/15.
 */
angular.module('agilesales-web').controller('SuggestAreaOtherD04Ctrl', ['$scope', '$rootScope', '$state', 'AreaOrderService', 'Loading', 'ExcelReaderService',
    function ($scope, $rootScope, $state, AreaOrderService, Loading, ExcelReaderService) {
        $scope.curSubmitOrder = {};
        $scope.getCurrentAreaSubmitOrder = function () {
            AreaOrderService.getCurrentAreaSubmitOrder().then(function (data) {
                console.log(data);
                if (data && !data.err) {
                    $scope.curSubmitOrder = data;
                    $scope.changeImportBtn(data.has_D04);
                }
            }, function (data) {
                console.log(data);
            });
        };
        $scope.getCurrentAreaSubmitOrder();
        $scope.changeImportBtn = function (text) {
            if (text === '有') {
                $scope.$emit('suggest.import.changed', {
                    title: '建议订单',
                    btns: [
                        {
                            text: '上传陈列订单',
                            clickCallback: function () {
                                orderClickCallback('D04');
                            }
                        },
                        {
                            text: '导出',
                            clickCallback: exportExecl
                        }
                    ]
                });
            }
            else {
                $scope.$emit('suggest.import.changed', {
                    title: '建议订单',
                    btns: []
                });
            }
        };


        $scope.clickOrderStatus = function (status) {
            $scope.curSubmitOrder.has_D04 = status;
            $scope.updateSubmitOrderStatus();
        };

        $scope.updateSubmitOrderStatus = function () {
            AreaOrderService.updateSubmitOhterOrderStatus({
                _id: $scope.curSubmitOrder._id,
                has_D02: $scope.curSubmitOrder.has_D02,
                has_D03: $scope.curSubmitOrder.has_D03,
                has_D04: $scope.curSubmitOrder.has_D04
            }).then(function (data) {
                console.log(data);
                if (data && !data.err) {
                    $scope.curSubmitOrder = data;
                    $scope.changeImportBtn(data.has_D04);
                }
            }, function (data) {
                console.log(data);
            });
        };

        $scope.orders = [];
        $scope.getOrdersByArea = function () {
            Loading.show();
            AreaOrderService.getOrdersByArea('D04').then(function (data) {
                if (!data.err) {
                    $scope.orders = data;
                }
                Loading.hide();
                console.log(data);
            }, function (data) {
                Loading.hide();
                console.log(data);
            });
        };
        $scope.getOrdersByArea();

        function orderClickCallback(orderType) {
            var headers = [
                {key: 'A1', value: 'SKU编码'},
                {key: 'B1', value: '产品名称'},
                {key: 'C1', value: '产品条码'},
                {key: 'D1', value: '品类'},
                {key: 'E1', value: '中分类名称'},
                {key: 'F1', value: '销售价格'},
                {key: 'G1', value: '订单数量'},
                {key: 'H1', value: '总销售价格'}
            ];

            function upload(orders, i) {
                AreaOrderService.otherOrderImport(orders[i++])
                    .then(function (data) {
                        if (data && data.err && data.err.type === 'product_not_exist') {
                            alert(data.err.message);
                            return $state.go('order_suggest.suggest_area_other_D04', {}, {reload: true});
                        }

                        console.log(data);
                        if (orders[i]) {
                            upload(orders, i);
                        }
                        else {
                            Loading.hide();
                            $state.go('order_suggest.suggest_area_other_D04', {}, {reload: true});
                        }
                    }, function (err) {
                        Loading.hide();
                        console.log(err);
                    });
            }

            function getContentKey(type) {
                switch (type) {
                    case  'D02':
                        return '批发订单';
                    case  'D03':
                        return '试用订单';
                    case  'D04':
                        return '陈列订单';
                }
                return '';
            }

            $scope.otherOrderImport = function (orders) {
                var i = 0;
                Loading.show();
                upload(orders, i);
            };

            $rootScope.$broadcast('show.dialogUpload', {
                title: '上传' + getContentKey(orderType),
                contents: [{
                    key: getContentKey(orderType),
                    value: '点击选择文件',
                    tip: '点击选择文件',
                    sheetName: '地区上传其他订单页面格式'
                }],
                color: 'blue',
                headers: headers,
                callback: function (data) {
                    var result = [];
                    data.forEach(function (item) {
                        result.push({
                            product_number: item['SKU编码'],
                            product_name: item['产品名称'],
                            product_barcode: item['产品条码'],
                            category: item['品类'],
                            mid_classify: item['中分类名称'],
                            sales_price: item['销售价格'],
                            order_count: item['订单数量'],
                            order_type: orderType,
                            total_price: item['总销售价格']
                        });
                    });
                    var orders = [];
                    for (var i = 0, len = result.length; i < len; i += 100) {
                        orders.push(result.slice(i, i + 100));
                    }
                    if (orders.length > 0) {
                        $scope.otherOrderImport(orders);
                    }
                    console.log(orders);
                }
            });
        }

        $scope.exportExcel = function () {
            var execlReader = ExcelReaderService.getReader();
            var rows = [[
                '产品名称',
                'SKU编码',
                '产品条码',
                '订单编码',
                '品类',
                '中分类名称',
                '销售价格',
                '订单数量',
                '总销售价格'
            ]];

            $scope.orders.forEach(function (o) {
                rows.push([
                    o.product_name,
                    o.product_number,
                    o.product_barcode,
                    o.order_number,
                    o.category,
                    o.mid_classify,
                    o.sales_price,
                    o.order_count,
                    o.sales_price * o.order_count
                ]);
            });

            execlReader.exportExcel(rows);
        };

        function exportExecl() {
            $scope.exportExcel();
        }
    }]);