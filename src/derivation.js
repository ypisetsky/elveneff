'use strict';

export class SumHolder {
  constructor(description) {
    this.terms = [];
    this.description = description;
    this.scaleDescription = "";
  }

  append(child) {
    this.terms.push(child);
  }

  getSum() {
    let sum = 0;
    for (const element of this.terms) {
      if (element instanceof SumHolder) {
        sum += element.getSum();
      } else if (element instanceof Value){
        sum += element.value;
      }
    }
    return sum;
  }

  scaleBy(scale) {
    for (const elem of this.terms) {
      elem.scaleBy(scale);
    }
  }
}

export class Value {
  constructor(description, value) {
    this.description = description;
    this.value = value;
  }

  scaleBy(scale) {
    this.value *= scale;
  }
}

/*class Derivation extends React.Component {
  render() {
    return <ul>
  }
}
*/
