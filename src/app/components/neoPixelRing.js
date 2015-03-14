var NeoPixelRingFactory = function($window) {

    var neoPixelRingLink = function(scope, ele, attr) {
        var self = this;
        var svg = d3.select(ele[0])
            .append('svg')
            .style('width','100%')
            .style('height','100%');

        scope.$watch('data', function(newVal,oldVal) {
            //console.log('hmmm');
            update();
        },true);

        $window.addEventListener('resize', function() {
            render();
        },this);

        render();
        function update() {
            var rect = svg.selectAll("rect")
                .data(scope.data);
            rect.attr("style", function(d,i) {
                return 'fill:rgb(' + d.r +',' + d.g +',' + d.b +');stroke-width:2;stroke:rgb(0,0,0)';
            });
        }

        function render() {
            svg.selectAll('*').remove();
            var theta = (Math.PI * 2)/(scope.data.length);

            var eleHeight = ele[0].offsetHeight;
            var eleWidth = ele[0].offsetWidth;

            var eleCenterX = eleWidth/2;
            var eleCenterY = eleHeight/2;

            var radius = (eleWidth > eleHeight) ? eleHeight/4 : eleWidth/4;
            var rectOffset = 20;
            /*
            var circle = svg.selectAll('circle').data([0,1]);
            var circleEnter = circle.enter().append('circle');

            circleEnter.attr('cx', function(d,i) {
                return eleCenterX;
            });
            circleEnter.attr('cy', function(d,i) {
                return eleCenterY;
            });
            circleEnter.attr('r', function(d,i) {
                return radius;
            });
            */

            var rect = svg.selectAll("rect")
                .data(scope.data);
            var rectEnter = rect.enter().append("rect");
            rectEnter.attr("y", function(d,i) {
                var result =  (radius * Math.sin(theta * i) + eleCenterY);
                return result;
            });
            rectEnter.attr("x", function(d, i) {
                var result =  (radius * Math.cos(theta * i) + eleCenterX);
                return result;
            });
            rectEnter.attr("width", function(d) {
                var size = (2 * radius * Math.tan(theta/2))-rectOffset;
                return size;
            });
            rectEnter.attr("height", function(d) {
                var size = (2 * radius * Math.tan(theta/2))-rectOffset;
                return size;
            });

            /*rectEnter.attr("transform", function(d,i) {

                var rot = (360/12) * i;
                var cenX = (100 * Math.sin(theta * i) + 250);
                var cenY = (100 * Math.cos(theta * i) + 250);
                var slope = (250-cenY)/(250-cenX);
                var neat = (1/slope) * (180/Math.PI);

                //return 'rotate(' + (360/12) + ' ' +  cenX + ' ' + cenY + ')';
            });*/
            /*
            rectEnter.attr("ng-click", function(d,i) {
                return ('ctrl.click(' + i +')');
            });
            */
        }
    };

    return {
        restrict:'EA',
        scope:{
            data:'='
        },
        link: neoPixelRingLink
    };

};

angular.module('app').directive('neopixelRing', ['$window', NeoPixelRingFactory]);