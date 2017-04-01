
$(document).ready(function() {
    $.getJSON('data.json', function(data) {
        let authors = document.getElementsByClassName('item-author');
        let captions = document.getElementsByClassName('carousel-caption');
        let timestamps = document.getElementsByClassName('item-timestamp');
        for(let i = 0; i < authors.length && i < data.stories.length; i++) {
            authors[i].innerHTML = data.stories[i].author_name;

            let title = data.stories[i].article_title;

            if (title.length > 83) {
                title = title.slice(0, 80);
                let indexOfLastSpace = title.lastIndexOf(' ');
                title = title.slice(0, indexOfLastSpace) + "...";
            }

            // div > p > span
            captions[i].firstElementChild.firstElementChild.innerHTML = title;

            timestamps[i].innerHTML = data.stories[i].article_creation_date;
        }

        // clone after json data has been loaded
        (function(){
        $('.carousel-showmanymoveone .item').each(function(){

          let itemToClone = $(this);

          for (let i = 1; i < 3; i++) {
            itemToClone = itemToClone.next();
            
            // wrap around if at end of item collection
            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }

            // grab item, clone, add marker class, add to collection
            itemToClone.children(':first-child').clone().addClass("cloneditem-" + i).appendTo($(this));
          }
        });
      }());
    });
});
