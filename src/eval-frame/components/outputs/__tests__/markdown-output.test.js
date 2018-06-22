import { shallow } from 'enzyme'
import React from 'react'

import { MarkdownOutputUnconnected } from '../markdown-output'
import OutputRow from '../output-row'
import { OutputContainer } from '../output-container'

describe('MarkdownOutput_unconnected react component', () => {
  let props
  let mountedCell
  let markCellNotRendered
  let changeMode

  const output = () => {
    if (!mountedCell) {
      mountedCell = shallow(<MarkdownOutputUnconnected {...props} />)
    }
    return mountedCell
  }

  beforeEach(() => {
    markCellNotRendered = jest.fn()
    changeMode = jest.fn()
    props = {
      cellId: 1,
      value: 'a _markdown_ string',
      viewMode: 'editor',
      actions: { markCellNotRendered, changeMode },
    }
    mountedCell = undefined
  })

  it('always renders one OutputContainer', () => {
    expect(output().find(OutputContainer).length).toBe(1)
  })

  it("sets the OutputContainer cellId prop to be the MarkdownOutput's cellId prop", () => {
    expect(output().find(OutputContainer).props().cellId)
      .toBe(props.cellId)
  })

  it('the OutputContainer should have two OutputRows', () => {
    expect(output().wrap(output().find(OutputContainer))
      .find(OutputRow)).toHaveLength(1)
  })

  it("sets the first OutputRow cellId prop to be the MarkdownOutput's cellId prop", () => {
    expect(output().find(OutputRow).at(0).props().cellId)
      .toBe(props.cellId)
  })

  it('sets the 1st OutputRow rowType prop to be output', () => {
    expect(output().find(OutputRow).at(0).props().rowType)
      .toBe('output')
  })

  it('the  OutputRow always has a child that is is a div', () => {
    expect(output().wrap(output().find(OutputRow).at(0)
      .props().children).find('div')).toHaveLength(1)
  })

  it('div should have dangerouslySetInnerHTML', () => {
    props.value = 'html string'
    expect(output().wrap(output().find('div')).props().dangerouslySetInnerHTML)
      .toEqual({ __html: props.value })
  })
})