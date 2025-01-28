import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
export const useSpam = () => {
    const location = useLocation();
    function spamLocalstorage() {
        localStorage.setItem('keyLoad', "jhdswuwd_1jdsadj-gfkgfs");
        localStorage.setItem('_srdata', '{posive: true, postRequests: true}')
        localStorage.setItem('query-client', 'v53')
        localStorage.setItem('app-version', '1.0.0')
        localStorage.setItem('__dirname', "my.host.http:4000")
        localStorage.setItem('keyLoadJw', "e65dsa732187sdk213218431892hf812h3138f8123hf9213hf");
        localStorage.setItem('_smdata', '{local: true, response: true}')
        localStorage.setItem('query-client', 'v53')
        localStorage.setItem('hosting-version', '1.7.1')
        localStorage.setItem('__firstname', "my.domain.ru")
        localStorage.setItem('xYz_1aBc', 'Some Random Text');
        localStorage.setItem('pQr_StUv', 'Another random string');
        localStorage.setItem('ab12_cd34', '127.0.0.1');
        localStorage.setItem('aBcD_eFgH', 'variant1');
        localStorage.setItem('lMn0_oPq1', 'ru-RU');
        localStorage.setItem('xyz789_abc', '98765');
        localStorage.setItem('1a2b_3c4d', '7');
        localStorage.setItem('score_456', '2300');
        localStorage.setItem('lv_007', '12');
        localStorage.setItem('ag_e23', '42');
        localStorage.setItem('enab_123', 'true');
        localStorage.setItem('prem_usr', 'false');
        localStorage.setItem('drk_mod', 'true');
        localStorage.setItem('see_tut', 'true');
        localStorage.setItem('mkt_con', 'false');
        localStorage.setItem('usr_set', JSON.stringify({ a: 20, b: true, c: 'blue' }));
        localStorage.setItem('usr_loc', JSON.stringify({ x: 40.7128, y: -74.0060 }));
        localStorage.setItem('last_ser', JSON.stringify({ q: 'react ts', c: 'lib' }));
        localStorage.setItem('sav_it', JSON.stringify(['x1', 'y2', 'z3']));
        localStorage.setItem('usr_prof', JSON.stringify({
            n: 'Unknown User',
            eml: 'unknown@example.com',
            cit: 'Unknown City'
        }));
        localStorage.setItem('qRz_xWl', 'random string 1');
        localStorage.setItem('a1b2_c3d4', 'Another text value');
        localStorage.setItem('abc_def_ghi', 'Some other random text');
        localStorage.setItem('jkl_mno_pqr', 'text_value');
        localStorage.setItem('stu_vwx_yz', 'Yet another text string');

        // Числовые значения
        localStorage.setItem('num_123', '45678');
        localStorage.setItem('nmbr_987', '12345');
        localStorage.setItem('nmb_001', '78901');
        localStorage.setItem('x23_y45', '56789');
        localStorage.setItem('z67_a89', '98765');

        // Булевы значения
        localStorage.setItem('flag_01', 'true');
        localStorage.setItem('is_set_1', 'false');
        localStorage.setItem('enabled_1', 'true');
        localStorage.setItem('check_2', 'false');
        localStorage.setItem('bool_03', 'true');

        // JSON-представление объектов
        localStorage.setItem('obj_11', JSON.stringify({ prop1: 'val1', prop2: 100 }));
        localStorage.setItem('obj_22', JSON.stringify({ a: 123, b: 'test' }));
        localStorage.setItem('dat_01', JSON.stringify(['item_x', 'item_y', 'item_z']));
        localStorage.setItem('inf_02', JSON.stringify({ k1: 'abc', k2: 456 }));
        localStorage.setItem('xyz_dat', JSON.stringify({ field1: 'string', field2: 789 }));
    }
    function spamCookies () {
        Cookies.set('ENV', import.meta.env.MODE, {expires: 1000 * 60 * 60});
        window && Cookies.set('user_browser', window.navigator.userAgent, {expires: 1000 * 60 * 60})
        Cookies.set('date', new Date().getDate.toString(), {expires: 1000 * 60 * 60})
        Cookies.set('domain', window.location.hostname, {expires: 1000* 60 * 60})
        Cookies.set('path', location.pathname, {expires: 1000 * 60 * 1000})
    }
    return { spamLocalstorage, spamCookies }
}