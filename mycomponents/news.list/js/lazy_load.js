$(document).ready(function(){

    $(document).on('click', '.load_more_news', function(){
		console.log(123);
        var targetContainer = $('.news_box'),          //  Контейнер, в котором хранятся элементы
            url =  $('.load_more_news').attr('data-url');    //  URL, из которого будем брать элементы

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    //  Удаляем старую навигацию
                    $('.load_more_news').remove();

                    var elements = $(data).find('.col'),  //  Ищем элементы
                        pagination = $(data).find('.load_more_news');//  Ищем навигацию

                    targetContainer.append(elements);   //  Добавляем посты в конец контейнера
                    targetContainer.append(pagination); //  добавляем навигацию следом

                }
            })
        }

    });
}
