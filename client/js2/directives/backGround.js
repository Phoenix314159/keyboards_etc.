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
                './js2/images/image10.jpg',
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

                });

            }, 7500)
        }
    }
})


