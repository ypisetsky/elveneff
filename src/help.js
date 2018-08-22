'use strict';
import React from 'react';

export default class HelpWindow extends React.Component {
  render() {
    return <div>
      <h1>Elvenar Efficiency Modeling</h1>
      <p>This is a tool meant to help make sense of the various options for
      buildings in your Elvenar town. it{"'"}s clear that space is the limiting
      factor for how much you can have in your city. However, there are other
      resources limiting building: culture, population, and supplies. Trying
      to compare buildings that are different in all of these can seem
      impossible, but this calculator tries to help out. It does this by
      creating "exchange rates" between these.</p>
      <p>The first such exchange rate is "culture density". This is the amount
      of culture per space you could fit into some new space. In other words,
      what{"'"}s the best culture building you can repeatably buy (so no event
      buildings, no premium buildings, etc.).</p>
      <p>Now that we have an exchange rate between space and culture, we can
      combine the culture and space requirements of a building into one number.
      Streets are slightly special: they take up space, but end up giving back
      some of the culture of that space.</p>
      <p>With culture + space requirements being treated as a single number, we
      can now calculate the culture requirements of any residence (since all
      it needs are space and culture).</p>
      <p>By assuming a level for residences, we can convert population
      requirements into an equivalent amount of space taken up by residences.
      This allows us to get space requirements for workshops and low level
      armories too, and allows us to compare population/culture buildings to
      pure culture buildings, too.</p>
      <p>If we know the space requirements for workshops, it means that we can
      calculate how much space the supplies needed to run manufactories and
      military production buildings take up (based on a daily collection
      schedule).</p>
      <h2>This calculator</h2>
      <p>The stats present in this tool are based on the model explained above.
      The most interesting columns are 'Spaces Used', which is the total
      converted culture requirement (converted to spaces) of the building, after
      converting population, culture, street, and supplies requirements into an
      equivalent amount of space. The Effective output / Culture Tile is simply
      the output of the building divided by this number. Use this number to
      figure out when it{"'"}s worth it to upgrade your buildings (many
      upgrades are not actually worth it to do: you need more overall space for
      the same amount of output by converting the production to the higher level
      buildings).</p>
      <p>The culture and population columns show how much total culture and
      population the building takes up (the official wiki only shows the extra
      culture/pop requirements for the upgrade instead of this total). There are
      also stats for the output / raw space and output / culture of each
      building (these are just raw numbers, no assumptions made).</p>
    </div>;
  }
}
