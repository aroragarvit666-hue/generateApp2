import React, { useState } from 'react'
import {
  Provider,
  defaultTheme,
  View,
  Flex,
  Heading,
  Content,
  Text,
  TextField,
  Button,
  ProgressCircle,
  InlineAlert
} from '@adobe/react-spectrum'
import actions from '../config.json'

export default function App({ runtime, ims }) {
  // Do NOT call runtime.done() here — index.js calls it in the ready handler
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const helloUrl = actions['hello'] // filled by the CLI at deploy / by the sandbox at preview

  async function sayHello() {
    setError('')
    setMessage('')

    if (!helloUrl) {
      // config.json is empty until the app is deployed or previewed
      setError('Action URL not available yet. Deploy the app (or run the preview) to call the action.')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(helloUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ims.token}`,
          'x-gw-ims-org-id': ims.org
        },
        body: JSON.stringify({ name: name || undefined })
      })
      if (!res.ok) throw new Error(`Action failed: ${res.status}`)
      const data = await res.json()
      setMessage(data.message)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <View padding="size-400" maxWidth="size-6000" margin="0 auto">
        <Flex direction="column" gap="size-300">
          <Heading level={1}>Hello World</Heading>
          <Content>
            <Text>Enter a name and greet it through an Adobe I/O Runtime action.</Text>
          </Content>

          <TextField
            label="Name"
            value={name}
            onChange={setName}
            placeholder="World"
            width="100%"
            onKeyDown={(e) => {
              if (e.key === 'Enter') sayHello()
            }}
          />

          <Flex>
            <Button variant="accent" onPress={sayHello} isPending={isLoading}>
              Say hello
            </Button>
          </Flex>

          {isLoading && (
            <Flex alignItems="center" justifyContent="center" height="size-1000">
              <ProgressCircle aria-label="Calling action" isIndeterminate size="M" />
            </Flex>
          )}

          {message && (
            <InlineAlert variant="positive">
              <Heading>Response</Heading>
              <Content>{message}</Content>
            </InlineAlert>
          )}

          {error && (
            <InlineAlert variant="negative">
              <Heading>Error</Heading>
              <Content>{error}</Content>
            </InlineAlert>
          )}
        </Flex>
      </View>
    </Provider>
  )
}
