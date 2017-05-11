angular.module('ecom').directive('backGround', function ($timeout, $interval) {
    return {
        restrict: 'A',
        link: (scope, elem, attr) => {
            elem.css({'background-image': './images/image1.jpeg'});
            let backgrounds = [
                './js2/images/image2.jpg',
                './js2/images/image3.jpg',
                './js2/images/image4.jpg',
                './js2/images/image5.JPG',
                './js2/images/image6.jpg',
                './js2/images/image7.jpg',
                './js2/images/image8.jpg',
                './js2/images/image9.jpg',
                './js2/images/image10.jpeg',
                './js2/images/image1.jpeg'
            ];
            let i = -1;

            $interval(() => {
                i++;
                if (i === backgrounds.length - 1) {
                    i = 0;
                }
                let bg_string = "url(" + backgrounds[i] + ")";
                elem.css({
                    'background-image': bg_string,
                    'background-size': 'cover',
                    'background-position': 'center',
                    'background-attachment': 'fixed',
                    'background-repeat': 'no-repeat',
                    'height': '100%',
                    'width': '100%',
                    'transition': '1s',
                    '-webkit-backface-visibility': 'hidden',
                    '-webkit-transform': 'translateZ(0) scale(1.0, 1.0)'
                });
            }, 7500)
        }
    }
})

//         // let base = 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
//             secs = 4;
//         backgrounds.forEach(function(img){
//             new Image().src = base + img;
//             // caches images, avoiding white flash between background replacements
//         });
//
//         function backgroundSequence() {
//             window.clearTimeout();
//             var k = 0;
//             for (let i = 0; i < backgrounds.length; i++) {
//                 setTimeout(function(){
//                     console.log('working');
//                     attr.style.background = "url(" + base + backgrounds[k] + ") no-repeat center center fixed";
//                     attr.style.backgroundSize ="cover";
//                     if ((k + 1) === backgrounds.length) { setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }
//                 }, (secs * 1000) * i)
//             }
//         }
//         backgroundSequence();
//
//
//
//
//     //         current = 0;
//     //     let nextBackground = () => {
//     //         elem.css('background',
//     //             backgrounds[current = ++current % backgrounds.length]
//     //         );
//     //         setTimeout(nextBackground, 1000);
//     //     }
//     //     setTimeout(nextBackground, 1000);
//     //     elem.css('background', backgrounds[0]);
//      }


