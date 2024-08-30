import { fromPromise } from "npm:neverthrow"

export function isPromiseAllSettledOK<T>(promises: Promise<T>[]) {
  return fromPromise(Promise.allSettled([...promises]), () => new Error('Promise allSettled error'))
}

export function isPromiseAllOK<T>(promises: Promise<T>[]) {
  return fromPromise(Promise.all([...promises]), () => new Error('Promise all error'))
}