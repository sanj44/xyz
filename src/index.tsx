import 'show-keys'
import './index.css'
import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import {
  createSlatePluginsComponents,
  createSlatePluginsOptions,
  SlatePlugins,
  createHistoryPlugin,
  createReactPlugin,
  ELEMENT_PARAGRAPH,
  SlatePlugin,
  SlatePluginComponent,
  getRenderElement,
  getSlatePluginTypes,
} from '@udecode/slate-plugins'
import { useFocused, useSelected } from 'slate-react'

import { editableProps } from './config/pluginOptions'

const id = 'Reproduction'

const customVoidPlugin = (): SlatePlugin => ({
  voidTypes: () => ['voidtext'],
  inlineTypes: getSlatePluginTypes('voidtext'),
  pluginKeys: ['voidtext'],
  renderElement: getRenderElement('voidtext'),
})

function VoidElement({ children, attributes, element, ...props }) {
  const focus = useFocused()
  const selected = useSelected()
  console.log({ props })
  return (
    <div
      {...attributes}
      style={{
        display: 'inline-block',
        backgroundColor: 'peru',
        border: focus && selected ? '2px solid blue' : '2px solid transparent',
      }}
    >
      <p
        style={{ display: 'inline-block', margin: 0, padding: 0 }}
        contentEditable={false}
      >{`custom void element: ${element.id}`}</p>
      {children}
    </div>
  )
}

let components = createSlatePluginsComponents({
  // customize your components by plugin key
})

const options = createSlatePluginsOptions({
  // customize your options by plugin key
})

const initialValue = [
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      { text: 'hello' },
      {
        type: 'voidtext',
        id: 'void-id',
        children: [{ text: '' }],
      },
      { text: ' asd' },
    ],
  },
]

const plugins = [createReactPlugin(), createHistoryPlugin(), customVoidPlugin()]

const Editor = () => {
  const [val, setVal] = useState([])
  return (
    <>
      <div>
        <SlatePlugins
          id={id}
          plugins={plugins}
          onChange={setVal}
          components={{
            ...components,
            voidtext: VoidElement,
          }}
          options={{
            ...options,
            voidtext: {
              type: 'voidtext',
              component: VoidElement as SlatePluginComponent,
            },
          }}
          editableProps={editableProps}
          initialValue={initialValue}
        />
      </div>
      <pre style={{ marginTop: 40 }}>
        <code>{JSON.stringify(val, null, 2)}</code>
      </pre>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Editor />, rootElement)
