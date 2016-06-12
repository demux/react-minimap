import React, {Component} from 'react'

import Minimap from '../../src'

import Wrapper from './Wrapper'


export default class Contained extends Component {
  render() {
    return <Wrapper>
      <div className="wrapper">
        <h1>Div Example</h1>

        <Minimap contain>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur dictum lorem, ut vulputate nisl ornare ac. Proin ac nibh at leo viverra ullamcorper id a magna. Donec gravida porta nulla id molestie. Sed facilisis dolor nec cursus malesuada. Quisque pharetra lectus eu erat laoreet cursus. In nec risus ut enim ultrices facilisis sed nec augue. Sed ullamcorper purus sit amet turpis mollis, id interdum purus commodo. Fusce posuere, erat vitae laoreet molestie, justo nisl fermentum odio, id feugiat ipsum tellus pellentesque sapien. Fusce rutrum orci aliquam, molestie ante a, ultricies ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed orci ipsum, ultrices vel vulputate id, rutrum at arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus volutpat semper felis sit amet venenatis. Vivamus cursus sapien quis ornare convallis.
          </p>
          <p>
          Mauris et sapien commodo, sagittis massa sit amet, tincidunt orci. Integer tincidunt eros odio, quis sagittis tortor pellentesque eu. Vestibulum ligula nisl, dapibus quis magna quis, lacinia commodo neque. Vestibulum accumsan sapien varius tempus cursus. Nunc sit amet justo tortor. Integer et rutrum nunc. Mauris commodo urna metus, a luctus tortor sollicitudin quis. Nulla dictum ultrices magna, id ornare turpis posuere sed. Nam ac quam a risus faucibus convallis ut ut metus. Proin quis nunc lacus. Pellentesque eget semper metus, at egestas nunc. Fusce lobortis dictum est, et commodo metus tempor id.
          </p>
          <p>
          Mauris sit amet ligula ac lectus rutrum venenatis in ut turpis. Aenean vitae turpis est. Morbi mattis at neque quis lobortis. Sed venenatis est a convallis egestas. Nulla ipsum massa, congue vitae ligula pulvinar, tincidunt egestas velit. Vestibulum eget accumsan leo, eget tincidunt ante. Suspendisse porta bibendum dui, nec consectetur enim pharetra ut.
          </p>
          <p>
          Nam id eleifend est. Donec in porttitor velit. Ut tincidunt mollis enim, non feugiat tellus fringilla eu. Donec at odio ut augue facilisis imperdiet in eget augue. In semper a neque in placerat. Ut et mi in lorem suscipit sodales. Vivamus congue sodales odio in ultricies. Integer sed malesuada nisl. Suspendisse a ornare turpis, at pretium odio. Morbi nec dapibus augue. Ut pulvinar nulla eros. Vestibulum a laoreet tellus, eu hendrerit libero.
          </p>
          <p>
          Vestibulum vestibulum, tortor sit amet laoreet ullamcorper, metus felis euismod neque, non placerat ipsum sem vitae eros. Quisque placerat ligula vitae accumsan tempus. Cras sed commodo urna, quis mollis nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas iaculis pretium semper. Suspendisse potenti. Ut ac commodo sem. Donec venenatis laoreet mauris, ut ornare felis dictum non. Nulla eget nulla quis quam feugiat aliquet vestibulum sit amet leo. Fusce tempor, est a condimentum scelerisque, dui augue venenatis nisi, nec ultricies orci est sed eros. Pellentesque lobortis leo facilisis justo hendrerit, sit amet rhoncus erat auctor. Donec eget rutrum mi. Vivamus tortor nisi, molestie a dolor at, ornare mattis tellus. Cras ultrices arcu sit amet urna blandit sollicitudin vel et ipsum. Etiam non libero lorem. Donec placerat felis eget elementum consequat.
          </p>
        </Minimap>
      </div>
    </Wrapper>
  }
}
