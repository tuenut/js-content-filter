/*  For use that content filter:
        0) You need jQuery
        1) file to page
        2) add html-attr <data-filterselector="YOUR_ATTR_NAME"> to input field and to elements, what you need filtering
        3) add next code to your page: $(document).ready( function(){ $("[data-filterselector=YOUR_ATTR_NAME]").filter_form(TEXT_FIND_SELECTOR); } );
    TEXT_FIND_SELECTOR uses to find html-container, where searching text is placing if it is not in container with <data-filterselector="YOUR_ATTR_NAME">,
    else TEXT_FIND_SELECTOR amy be passed.
    Container with <data-filterselector="YOUR_ATTR_NAME"> will be hide if text in input-field not containing in that container or in container by TEXT_FIND_SELECTOR.
*/

(function ($) {
    $.fn.filter_form = function (text_find_selector=null) {
        var $input_fields = this.filter("input");
        var $contents = this.not("input");

        $input_fields.keyup( function () {
            var keyword_selector = "[data-filterselector=" + this.dataset.filterselector + "]";
            var $current_field = $input_fields;
            var $current_content = $contents;
            var text = $current_field.val();

            if (text) {
                var pattern = ":contains(" + text + ")";
                if (text_find_selector){
                        var $to_show = $current_content.find(text_find_selector).filter(pattern).parents(keyword_selector);
                        var $to_hide = $current_content.not($to_show);
                        $to_hide.css('cssText', 'display: none !important;'); //hide();
                        $to_show.css('display', ''); //show();
                }
                else{
                $current_content.not($current_content.filter(pattern)).hide();
                $current_content.filter(pattern).show();
                }
            }
            else{
                $current_content.show()
            }
        });

        return this;
    }
}(jQuery));
