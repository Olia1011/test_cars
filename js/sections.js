$(document).ready(function() {
    const divTitle = $('#accordeon .acc-head');

    divTitle.click(function() {
        const ul = $(this).next();

        if (ul.css('display') === 'none') {
            ul.show();
            $(this).parent().css({ 'box-shadow': "0px 0px 18px rgba(68, 68, 68, 0.09)", 'background-color': 'white' });
            $(this).css({ 'color': '#DF4E3C', 'border-bottom': 'none' });
            $(this).find('.acc-head-div').addClass('empty_div');
            $(this).find('.acc-head-div').removeClass('accordion_content_div');

        } else {
            ul.hide();
            $(this).parent().css({ 'box-shadow': "none", 'background-color': 'transparent' });
            $(this).css({ 'color': '#000000', 'border-bottom': '1px solid #C4C4C4' });
            $(this).find('.acc-head-div').removeClass('empty_div');
            $(this).find('.acc-head-div').addClass('accordion_content_div');
        }
    })

    $('#mail_input').blur(function() {
        if ($(this).val() != '') {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if (pattern.test($(this).val())) {
                $(this).css({ 'border': '1px solid #507A36' });
                $('#mail_input').addClass('valid');
                $('#mistake_mail').text('');
            } else {
                $(this).css({ 'border': '1px solid #DF4E3C' });
                $('#mail_input').addClass('not_valid');
                $('#mistake_mail').text('Incorrect email').css({ 'color': '#DF4E3C' });
            }
        } else {
            $(this).css({ 'border': '1px solid #8D8D8D', 'background-image': 'none' });
            $('#mistake_mail').text('');
        }
    });



    $('.select, .sort_select').each(function() {
        const _this = $(this),
            selectOption = _this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            duration = 450; // длительность анимации 

        _this.hide();
        _this.wrap('<div class="select"></div>');
        $('<div>', {
            class: 'new-select',
            text: _this.children('option:disabled').text()
        }).insertAfter(_this);

        const selectHead = _this.next('.new-select');
        $('<div>', {
            class: 'new-select__list'
        }).insertAfter(selectHead);

        const selectList = selectHead.next('.new-select__list');
        for (let i = 1; i < selectOptionLength; i++) {
            $('<div>', {
                    class: 'new-select__item',
                    html: $('<span>', {
                        text: selectOption.eq(i).text()
                    })
                })
                .attr('data-value', selectOption.eq(i).val())
                .appendTo(selectList);
        }

        const selectItem = selectList.find('.new-select__item');
        selectList.slideUp(0);
        selectHead.on('click', function() {
            if (!$(this).hasClass('on')) {
                $(this).addClass('on');
                selectList.slideDown(duration);

                selectItem.on('click', function() {
                    let chooseItem = $(this).data('value');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectHead.text($(this).find('span').text());
                    selectHead.css({ 'border': '1px solid #DF4E3C' });
                    selectList.slideUp(duration);
                    selectHead.removeClass('on');
                });

            } else {
                $(this).removeClass('on');
                selectList.slideUp(duration);
            }
        });
    });
});