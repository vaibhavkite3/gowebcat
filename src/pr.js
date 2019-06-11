function test (obj) {
  return new Promise((resolve, reject) => {
    return (...obj, {"key2": "value2"})
  })
}

test({ 'key1': 'value' })
