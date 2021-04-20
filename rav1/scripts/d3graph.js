        AFRAME.registerComponent('group-opacity', {
            schema: {opacity: {default: 1.0}},
            update: function () {
                var opacity = this.data.opacity;
                var children = [].slice.call(this.el.children);
                children
                    .filter(function (child) {
                        return child.hasAttribute('material') || child.hasAttribute('group-opacity');
                    })
                    .forEach(function (child) {
                        child.setAttribute('material', "opacity: " + opacity);
                        child.setAttribute('group-opacity', "opacity: " + opacity);
                    });
            }
        });
        
        function getEthPrice() {
            fetch("https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=GBP&limit=10").then(data => {
                data.json().then(res => {
                    let points = (res.Data.Data.map(data => {
                        return {v: data.open}
                    }));
                    update(points, "3");
                })
            });
        }

        function update(data, modifier) {
            d3.select('#bars' + modifier).selectAll('a-entity').remove();

            var entities = d3.select('#bars' + modifier)
                .selectAll('a-entity')
                .data(data);

            var newobj = entities.enter()
                .append('a-entity')
                .attr('position', function (d, i) {
                    var a = 2 / data.length;
                    return a * i - 1 + ' -0.5 0'
                })
                .attr('group-opacity', d3.select('#bars' + modifier).attr('group-opacity'));

            // appending a box within each entity
            newobj.append('a-box')
                .attr('color', 'red')
                .attr('width', 0.2)
                .attr('height', function (d, i) {
                    return modifier === "3" ? d.v - data[0].v : d.v;
                })
                .attr('depth', 0.5)
                .attr('position', function (d, i) {
                    return '0 ' + (modifier === "3" ? ((d.v - data[0].v) / 2) : (d.v / 2)) + ' 0'
                })
                .attr('material', d3.select('#bars' + modifier).attr('group-opacity'));

            // update height of each box
            entities.select('a-box')
                .attr('height', function (d, i) {
                    return d.v
                });

            newobj.append('a-text')
                .attr('value', function (d) {
                    return parseInt(d.v * 10)
                })
                .attr('color', 'black')
                .attr('position', function (d) {
                    return '0 1.5 0'
                })
                .attr('visible', false);

            entities.on('mouseenter', function () {
                d3.select(this)
                    .select('a-text')
                    .attr('visible', true)
            });

            entities.on('mouseleave', function () {
                d3.select(this)
                    .select('a-text')
                    .attr('visible', false)
            });
        }