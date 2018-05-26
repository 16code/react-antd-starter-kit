export default class MapLoader {
    constructor() {
        this.config = {
            v: '4.1.0',
            file: 'echarts.min.js',
            host: '//cdn.bootcss.com/echarts'
        };
    }
    makeScriptSrc(cfg) {
        return `${cfg.host}/${cfg.v}/${cfg.file}`;
    }
    require(cfg = {}) {
        const config = Object.assign({}, this.config, cfg);
        if (window.echarts) return Promise.resolve(window.echarts);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = this.makeScriptSrc(config);

        const promise = new Promise((resolve, reject) => {
            script.onload = () => resolve(window.echarts);
            script.onerror = error => reject(error);
        });
        document.head.appendChild(script);
        return promise;
    }
}