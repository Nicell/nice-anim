import { Component, Element, Prop, h, Build } from '@stencil/core';

import { NiceAnimConfig } from './nice-anim-config';

@Component({
  tag: 'nice-anim',
  styleUrl: 'nice-anim.css',
  shadow: false
})
export class NiceAnim {
  @Element() el: HTMLElement;

  /**
   * Direction the element moves when animating in
   */
  @Prop() direction: 'up' | 'down' | 'right' | 'left' = 'up';

  /**
   * How long to delay the animation (ms)
   */
  @Prop() delay: number = 0;

  /**
   * How long the animation runs (ms)
   */
  @Prop() duration: number = 500;

  /**
   * How far the element moves in the animation (% of element width/height)
   */
  @Prop() animationDistance: string = '30%';

  /**
   * How much of the element must be visible before it animates (% of element height)
   */
  @Prop() triggerDistance: string = '33%';

  io: IntersectionObserver;

  hasIOSupport: boolean;

  config: NiceAnimConfig;

  cssClass: string;

  constructor() {
    this.hasIOSupport = typeof IntersectionObserver !== 'undefined';
    this.config = NiceAnimConfig.getInstance();
    this.cssClass = Build.isBrowser
      ? this.hasIOSupport
        ? 'nice-anim'
        : this.config.fallbackCssClass
      : this.config.ssrCssClass;
  }

  componentDidLoad() {
    if (this.hasIOSupport) {
      this.addIntersectionObserver();
      const animationDistance = this.direction === 'right' || this.direction === 'down' ? '-' + this.animationDistance : this.animationDistance;
      (this.el.querySelector('.nice-anim') as HTMLElement).style.setProperty('--distance', animationDistance);
    }
  }

  addIntersectionObserver() {
    this.io = new IntersectionObserver((data: any) => {
      if (data[0].isIntersecting) {
        this.el.querySelector('.nice-anim').classList.add(`slide-${this.direction}`);
        this.removeIntersectionObserver();
      }
    }, {
      threshold: parseFloat(this.triggerDistance) / 100
    });
    this.io.observe(this.el.querySelector('.nice-anim'));
  }

  removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  render() {
    return (
      <div
        class={this.cssClass}
        style={{
          animationDuration: `${this.duration}ms`,
          animationDelay: `${this.delay}ms`
        }}
      >
        <slot/>
      </div>
    );
  }
}
