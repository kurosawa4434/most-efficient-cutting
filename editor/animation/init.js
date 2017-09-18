//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {

        function mostEfficientCuttingCanvas(dom, expl, dataInp){
            const   TOP_MARGIN = 20,
                    BOTTOM_MARGIN = 10,
                    BAR_HEIGHT = 10,
                    BAR_BOTTOM_MARGIN = 10;

            const   fullWidth = 335,
                    fullHeight
                        = expl.length * (BAR_HEIGHT + BAR_BOTTOM_MARGIN)
                                            + TOP_MARGIN + BOTTOM_MARGIN;

            const paper = Raphael(dom, fullWidth, fullHeight, 0, 0);
            const color = {
                dark: "#294270",
                erase: "#DFE8F7",
                orange: "#FABA00",
                blue: "#8FC7ED",
            };
            const attr = {
                rect0: {
                    'stroke': color.erase,
                    'stroke-width': 1,
                    'fill': color.erase
                },
                rect: {
                    'stroke': color.dark,
                    'stroke-width': 1
                },
                text: {
                    'stroke': color.erase,
                    'font-size': 12, 
                    'font-family': "Verdana"
                },
            };

            // draw objects
            let mts = paper.set();
            let texts = paper.set();

            // prepare
            expl.forEach((material, i)=>{
                // full bar
                mts.push(paper.rect(0,
                    i * (BAR_HEIGHT + BAR_BOTTOM_MARGIN) + TOP_MARGIN,
                    300,
                    10).attr(attr.rect0));
                let cur_length = 0;
                let total = 0;
                // cuttting bar
                material.forEach((value, j)=>{
                    mts.push(paper.rect(cur_length,
                        i * (BAR_HEIGHT + BAR_BOTTOM_MARGIN) + TOP_MARGIN,
                        value / 20,
                        10).attr(attr.rect0));
                    cur_length += value / 20;
                    total += value;
                });
                // text (rest length)
                texts.push(paper.text(300+20, 
                    i * (BAR_HEIGHT + BAR_BOTTOM_MARGIN) + 25,
                    6000 - total
                ).attr(attr.text));
            });

            // let's animate
            let n = 0;
            const delay = 100;
            for (let i=0; i < expl.length; i += 1) {
                const n1 = n;
                setTimeout(function () {
                    mts[n1].animate(attr.rect, 50 );
                    mts[n1].animate({'fill': color.blue}, 50);
                }, 100+n*delay);
                n += 1;
                for (let j=0; j < expl[i].length; j += 1) {
                    const n2 = n;
                    setTimeout(function () {
                        mts[n2].animate(attr.rect, 600 );
                        mts[n2].animate({'fill': color.orange}, 600);
                    }, 100+n*delay);
                    n += 1;
                }
                setTimeout(function () {
                    texts[i].animate({'stroke': color.blue}, 0);
                }, 100+n*delay);
            }
        }

        var $tryit;
        var io = new extIO({
            multipleArguments: false,
            functions: {
                js: 'mostEfficientCutting',
                python: 'most_efficient_cutting'
            },
            animation: function($expl, data){
                mostEfficientCuttingCanvas($expl[0],
                    data.ext.explanation, data.in);
            }
        });
        io.start();
    }
);
