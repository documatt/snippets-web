import { attemptTo } from '@/utils'


describe('attemptTo()', () => {
  test('returns testValue on success', async () => {
    const workFn = async () => 'foo'
    const testFn = async val => val === 'foo'

    const rt = await attemptTo('test', workFn, testFn)
    expect(rt).toBe('foo')
  });

  test('attempts exhausted without success', async () => {
    const workFn = async () => 'foo'
    const testFn = async () => false  // never matches
    // waitTime needs to be small enough to finish all 3 attempts within default 5000 ms timeout
    const rt = await attemptTo('test', workFn, testFn, 3, 10)
    expect(rt).toBeUndefined()
  })

  test('repeat until maxAttempts reached', async () => {
    const workFn = jest.fn(() => 'foo')
    const testFn = async () => false  // never matches
    await attemptTo('test', workFn, testFn, 5, 10)
    expect(workFn).toHaveBeenCalledTimes(5)
  })

  test('workFn and testFn are not async', async () => {
    const workFn = () => 'foo'
    const testFn = val => val === 'foo'

    const rt = await attemptTo('test', workFn, testFn)
    expect(rt).toBe('foo')
  })
})
