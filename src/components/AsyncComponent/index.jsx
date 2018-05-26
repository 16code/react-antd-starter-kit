const delay = require('utils/index').delay;
const Loading = require('../Loading').Loading;
const asyncComponent = getComponent => {
    return class AsyncComponent extends React.PureComponent {
        state = { Component: null };
        constructor() {
            super();
            this.unMount = false;
            this.componentRef = React.createRef();
        }
        componentWillMount() {
            if (!this.state.Component) {
                getComponent()
                    .then(({ default: Component }) => {
                        !this.unMount && this.setState({ Component });
                    })
                    .catch(e => {
                        console.info(e);
                    });
            }
        }
        componentDidUpdate() {
            this.applyRouterTransition();
        }
        componentWillUnmount() {
            this.unMount = true;
            if(this.componentRef) this.componentRef.setState = () => {};
        }
        getAnimatedDomNode() {
            let element;
            const ref = this.componentRef.current;
			const elementRef = ReactDOM.findDOMNode(ref); // eslint-disable-line
            if (ref && elementRef) {
                element = elementRef.querySelector('.page-content');
            }
            return element;
        }
        async applyRouterTransition() {
            const element = this.getAnimatedDomNode();
            if (element) {
                element.setAttribute('animated', 'page-enter');
                await delay(1200);
                element.removeAttribute('animated');
            }
        }		
        get renderLoading() {
            return <div style={{ paddingTop: '80px' }}><Loading key="Loading" size="small" /></div>;
        }
        renderComponent(Component) {
            return <Component key="Component" ref={this.componentRef} {...this.props} />;
        }
        render() {
            const { Component } = this.state;
            return Component ? this.renderComponent(Component) : this.renderLoading;
        }
    };
};

module.exports = asyncComponent;