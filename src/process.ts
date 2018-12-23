class CSSPercent {
  constructor (private config: any) {

  }

  private regPxVw: RegExp = /([-]?[\d.]+)pxw/;
  private regPxVh: RegExp = /([-]?[\d.]+)pxh/;

  private pxToPercent (pxStr: string) {
    interface BaseDataVale {
      unit: string;
      designValue: number;
    }
    const pxValue = parseFloat(pxStr);
    const baseData: BaseDataVale = this.getBaseData(pxStr);
    const percentValue: number | string = +(pxValue / baseData.designValue * 100).toFixed(this.config.fixedDigits);
    const percentValueStr: string = `${percentValue}${baseData.unit}`;

    return {
      pxStr,
      pxValue,
      percentValue,
      percentValueStr
    };
  }

  private getBaseData (str: string) {
    if (this.regPxVw.test(str)) {
      return {
        unit: 'vw',
        designValue: this.config.designWidth
      };
    } else if (this.regPxVh.test(str)) {
      return {
        unit: 'vh',
        designValue: this.config.designHeight
      };
    }

    return {
      unit: '',
      designValue: 0
    };
  }

  private getPxStr (str: string) {
    if (this.regPxVw.test(str)) {
      return str.match(this.regPxVw);
    } else if (this.regPxVh.test(str)) {
      return str.match(this.regPxVh);
    }

    return false;
  }

  cover (text: string) {
    let match = this.getPxStr(text);
    if (!match) {return null;}

    return this.pxToPercent(match[0]);
  }
}

export default CSSPercent;
