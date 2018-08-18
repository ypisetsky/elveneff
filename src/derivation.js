'use strict';
import React from 'react';

import {formatNum} from './util';

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

  clone() {
    const ret = new SumHolder(this.description);
    for (const element of this.terms) {
      ret.append(element.clone());
    }
    return ret;
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

  clone() {
    return new Value(this.description, this.value);
  }
}

export class Derivation extends React.Component {
  render() {
    const e = this.props.item;
    const word = this.props.word;
    if (e instanceof Value) {
      return <li>{formatNum(e.value)} {word} for {e.description}</li>
    } else if (e instanceof SumHolder) {
      return <li>
        {formatNum(e.getSum())} {word} for {e.description}
        <ul>
          {e.terms.map((term) => <Derivation word={word} item={term} />)}
        </ul>
      </li>;
    }
    return <li>Error: Unable to render!</li>;
  }
}
