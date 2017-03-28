/**
 * Created by panktibhalani on 3/27/17.
 */


(function () {

    angular
        .module("WebAppMaker")
        .directive("dashboardDirectives", dashboardDirectives);
    
    
    function dashboardDirectives() {

        $(document).ready(function() {
            $('i.glyphicon-thumbs-up, i.glyphicon-thumbs-down').click(function(){
                var $this = $(this),
                    c = $this.data('count');
                if (!c) c = 0;
                c++;
                $this.data('count',c);
                $('#'+this.id+'-bs3').html(c);
            });
            $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox();
            });
        });
    }
})();
