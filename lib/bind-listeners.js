export default function bindListeners(instance) {
  for (const k of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
    if (!/^on[A-Z]/.test(k)) continue

    const listener = instance[k]
    if ('function' === typeof listener) {
      instance[k] = listener.bind(instance)
    }
  }
}
