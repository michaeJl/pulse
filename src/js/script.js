window.addEventListener('DOMContentLoaded', function(){
    'use strict'    

    let arrow_left = document.querySelector('.arrow-left'),
        arrow_rigt = document.querySelector('.arrow-rigt'),
        slide = document.querySelectorAll('.slide'),
        now = 0;

        function clear() {
            for(let i = 0; i<slide.length; i++){
                slide[i].classList.add('hidden');
                slide[i].classList.remove('reverse_show');
                slide[i].classList.remove('reverse_hide');
            }
        }

        function alsoClear(){
            for(let i = 0; i<slide.length; i++){
                slide[i].classList.add('hidden');
                slide[i].classList.remove('show');
                slide[i].classList.remove('hide');
            }
        }

    function active(n){

        if (n > slide.length - 1){
            n = 0;
            now = 0;
            clear();
        } else if (n < 0) {
            n = slide.length - 1;
            now = slide.length - 1;
            alsoClear();
        }

        slide[n].classList.remove('hidden');
    }

    arrow_rigt.addEventListener('click', function (){
        for(let i = 0; i<slide.length; i++){
            slide[i].classList.remove('reverse_show');
            slide[i].classList.remove('reverse_hide');
        }

        slide[now].classList.remove('show');
        slide[now].classList.remove('hide');

        slide[now].classList.add('hide');

       setTimeout(function () {
        slide[now].classList.add('hidden');
        now++;
        active(now);
        slide[now].classList.add('show')
       }, 500);
    });

    arrow_left.addEventListener('click', function (){
        for(let i = 0; i<slide.length; i++){
            slide[i].classList.remove('show');
            slide[i].classList.remove('hide');
        }
        
        slide[now].classList.remove('reverse_show');
        slide[now].classList.remove('reverse_hide');

        slide[now].classList.add('reverse_hide');

        setTimeout(function () {
        slide[now].classList.add('hidden');
        now--;
        active(now);
        slide[now].classList.add('reverse_show');
       }, 500);
    });


    let catalog = document.querySelector('.sec5_catalog'),
        tab = document.querySelectorAll('.sec5_catalog_item'),
        contentList = document.querySelectorAll('.sec5_contentList');
        

        function show(){
            tab[0].classList.add('sec5_catalog_item_active');
            contentList[0].style.display = 'flex';
        }
        show();
    
        catalog.addEventListener('click', function(event) {
            let targ = event.target.closest('.sec5_catalog_item');
            if (!targ) return;
            for(let i = 0; i < tab.length; i++){
                tab[i].classList.remove('sec5_catalog_item_active');
                contentList[i].style.display = 'none';
                if(targ == tab[i]) {
                    tab[i].classList.add('sec5_catalog_item_active');
                    contentList[i].style.display = 'flex';
                }

            }
            
            console.log(targ);
        }); 

    let more = document.querySelectorAll('.sec5_contentList_link'),
        back = document.querySelectorAll('.sec5_contentList_Back'),
        wrap1 = document.querySelectorAll('.sec5_wrapmore_1'),
        wrap2 = document.querySelectorAll('.sec5_wrapmore_2');

        function toggleClass(items){
            items.forEach(function(item){
                item.addEventListener('click', function(event){
                    event.preventDefault();
                    let targ = event.target;
                    for(let i = 0; i < items.length; i++){
                        if(targ == items[i]){
                            wrap1[i].classList.toggle('sec5_wrapmore_1_active');
                            wrap2[i].classList.toggle('sec5_wrapmore_2_active');
                        }
                    }
                    
                });
            });
        }

        toggleClass(more);
        toggleClass(back);

    let btnModal1 = document.querySelectorAll('button[data-modal="consultation"]'),
        btnModal2 = document.querySelectorAll('.sec5_contentList_wrap > button'),
        overlay = document.querySelector('.overlay'),
        modal1 = document.querySelector('#consultation'),
        modal2 = document.querySelector('#order'),
        modalDescr = document.querySelectorAll('.modal_descr'),
        subtitle = document.querySelectorAll('.sec5_contentList_subtitle'),
        close = document.querySelectorAll('.modal_close');
    
        close.forEach(function(items){
            items.addEventListener('click',function(){
                overlay.style.display = 'none';
                modal1.style.display = 'none';
                modal2.style.display = 'none';
                document.body.style.overflow = "";
            });
        }) ;


        btnModal1.forEach(function(item){
                item.addEventListener('click', function(element){
                    let targ = element.target;
                    if ( item == targ) {
                    overlay.style.display = 'block';
                    modal1.style.display = 'block';
                    document.body.style.overflow = "hidden";
                }
            });
        });

        btnModal2.forEach(function(item,i){
            item.addEventListener('click', function(element){
                let targ = element.target;
                if ( item == targ) {
                overlay.style.display = 'block';
                modal2.style.display = 'block';
                modalDescr[1].innerHTML = subtitle[i].innerHTML; 
                document.body.style.overflow = "hidden";
            }
            });
        });

       
    $("input[name=phone]").mask("+(999) 99 999-99-99");
        
    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function(){
                $(this).find("input").val("");
                $('#order, #consultation').fadeOut();
                $('.overlay, #thanks').fadeIn('slow');
                $('form').trigger('reset');
            });
            return false;
    });

    let up = document.querySelector('.pageup'),
        hed = document.querySelector('header');

    window.addEventListener('scroll',function(){
        if ((document.documentElement.scrollTop) > 1160) 
        { 
            up.style.display = 'block';
        }
        else { up.style.display = 'none'};
    });
    
    up.addEventListener('click',function(e){
        e.preventDefault();
        hed.scrollIntoView({behavior: "smooth"});
    });
});
