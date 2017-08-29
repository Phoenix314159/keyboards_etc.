angular.module('ecom').directive('backGround', function ($timeout, $interval) {
    return {
        restrict: 'A',
        link: (scope, elem, attr) => {
            elem.css({'background-image': 'https://previews.123rf.com/images/tzido/tzido1508/tzido150800637/43812432-music-studio-Stock-Photo-recording.jpg'});

            let backgrounds = [
                    'http://goldwallpapers.com/uploads/posts/music-studio-backgrounds/music_studio_backgrounds_020.jpg',
                    'https://s-media-cache-ak0.pinimg.com/originals/ec/05/cb/ec05cbb0226b7637330c4850b6f171a5.jpg',
                    'http://breweryrecording.com/img/gallery/control-1.jpg',
                    'https://s-media-cache-ak0.pinimg.com/originals/04/dc/27/04dc275cfd874e45ee542bafff3f73e7.jpg',
                    'http://www.blackbird-music-studio.de/wp-content/uploads/2015/02/Blackbird-Music-Studio_Pre-Production-Suite_web.jpg',
                    'https://s-media-cache-ak0.pinimg.com/originals/c1/87/28/c187284a8ab128e30bc61c8ef4882b1c.jpg',
                    'https://s-media-cache-ak0.pinimg.com/originals/00/f2/38/00f2388ba69f258604b6058d9f5a46b7.jpg',
                    'https://www.workinentertainment.com/blog/wp-content/uploads/2016/03/home-music-studio.jpg',
                    'https://i.ytimg.com/vi/1rKJSN5dSYI/maxresdefault.jpg'
                ];

            let i = -1;

            $interval(() => {
                backgrounds.forEach(img => {
                    new Image().src = img;
                });
                i++;
                if (i === backgrounds.length) {
                    i = 0;
                }
                let bg_string = "url(" + backgrounds[i] + ")";

                elem.css({
                    'background-image': bg_string,
                    'background-attachment': 'fixed',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'background-blend-mode': 'darken',
                    'background-size': 'cover',
                    'opacity': '.90',
                    'transition': '1.7s',
                    '-webkit-backface-visibility': 'hidden',
                    'height': '100%',
                    'width': '100%'
                });
            }, 10000)
        }
    }
})


