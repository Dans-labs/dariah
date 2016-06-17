/* INDIVIDUAL COMPONENT: Control
 * Manages the sharing drawer for generating hyperlinks to the current page.
 */

let g = require('./generic.js');

function Share(component) { // the SHARE component
    this.component = component;
};

Share.prototype = {
    show: function(vr) {
        return true;
    },
    weld: function(vr) {
	    let h = `
<p id="citeh">Cite</p>
<table align="center">
    <tr>
        <td class="clip_pv clr">
            <a lnk="" href="#" id="clip_pv_md" title="link to page content and appearance (markdown)" class="ctrl fa fa-level-down fa-lg fa-fw"></a>
            <a lnk="" href="#" id="clip_pv_ht" title="link to page content and appearance (html)" class="ctrl fa fa-external-link-square fa-lg fa-fw"></a>
            <a lnk="" href="#" id="clip_pv_htc" title="link to page content (html)" class="ctrl fa fa-external-link fa-lg fa-fw"></a>
            <a lnk="" href="#" id="clip_pv_cn" title="copy page content" class="ctrl fa fa-file-text-o fa-lg fa-fw"></a>
        </td>
    </tr>
    <tr>
        <th class="clip_pv" width="60px">page view</th>
    </tr>
    <tr class="citexpl">
        <td class="clip_pv"><span id="xc_pv" class="ctrl fa fa-chevron-right fa-fw"></span><span id="x_pv" class="detail">share link to this page with or without view settings.</span></td>
    </tr>
</table>
<p id="cdiagpub"></p>
<p id="cdiagsts"></p>
`;	
        this.component.container.get(vr).html(h);
    },
    wire: function(vr) {
        let that = this;
        let cc = this.component.container.get(vr);
        let slink = $('#self_link');
        slink.hide();
        cc.addClass('socialdrawer');
        cc.find('.detail').hide();
        cc.find('#clip_pv_md,#clip_pv_ht,#clip_pv_htc,#clip_pv_nl').click(function(e) {e.preventDefault();
            window.prompt('Press <Cmd-C> and then <Enter> to copy link on clipboard', $(this).attr('lnk'));
        });
        cc.find('#clip_pv_cn').click(e => {e.preventDefault();
            let containerid = 'middle';
            let app_url_raw = app_url_cite+that.component.state.getVars(true);
            slink.show();
            slink.attr('href', app_url_raw);
            g.selectText(containerid);
        });
        cc.find('#xc_pv').click(function(e){e.preventDefault(); g.toggleDetail($(this), $('#x_pv'))});
        cc.click(function(e){e.preventDefault();
            let app_url_raw = app_url_cite+that.component.state.getVars(true);
            let app_url_rawc = app_url_cite+that.component.state.getVars(false);
            $('#citeh').hide();
            $('#cdiagpub').html('');
            $('#cdiagsts').html('');
            $('.clip_pv.clr,#cdiagpub,#cdiagsts').removeClass('error warning good special');
            let pvtitle = g.escapeHTML($('title').text());
            $('#clip_pv_md').attr('lnk', '[${pvtitle}](${app_url_raw})');
            $('#clip_pv_ht').attr('lnk', app_url_raw);
            $('#clip_pv_htc').attr('lnk', app_url_rawc);
            $('#clip_pv_cn').attr('lnk', app_url_raw);
            $('#clip_pv_cn').attr('tit', pvtitle);
            $(this).animate({height:'100px', width:'200px', opacity: 0.95}, 300);
        });
        cc.mouseleave(() => { 
            slink.hide();
            //g.deselectText();
            $('#citeh').show();
            cc.animate({height:'20px', width: '40px', opacity: .7}, 300); 
            return false;
        });
    },
    work: function(vr) {},
};

module.exports = Share;
