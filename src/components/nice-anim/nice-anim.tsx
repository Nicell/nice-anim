import { Component, Element, Prop, h } from '@stencil/core';

@Component({
  tag: 'nice-anim',
  styleUrl: 'nice-anim.css',
  shadow: false
})
export class NiceAnim {
  @Element() el: HTMLElement;
  @Prop() direction: 'up' | 'right' | 'left' = 'up';
  @Prop() delay: number = 0;
  @Prop() duration: number = 500;
  @Prop() animationDistance: string = '30%';
  @Prop() triggerDistance: string = '33%';

  io: IntersectionObserver;

  componentDidLoad() {
    this.addIntersectionObserver();
    (this.el.querySelector('.nice-anim') as HTMLElement).style.setProperty('--distance', this.animationDistance);
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
        class="nice-anim"
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
