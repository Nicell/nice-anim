export enum SSRMode {
  Static = 'STATIC',
  Rehydrate = 'REHYDRATE',
}

export class NiceAnimConfig {

  public fallbackCssClass: string;

  public ssrMode: SSRMode;

  public get ssrCssClass(): string {
    if (this.ssrMode === SSRMode.Static) {
      return '';
    } else if (this.ssrMode === SSRMode.Rehydrate) {
      return 'nice-anim';
    }
  }


  private static instance: NiceAnimConfig = null;

  private constructor() {
    this.ssrMode = SSRMode.Rehydrate;
    this.fallbackCssClass = '';
  }

  static getInstance() {
    if (!NiceAnimConfig.instance) {
      NiceAnimConfig.instance = new NiceAnimConfig();
    }
    return NiceAnimConfig.instance;
  }
}
