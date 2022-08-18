import { validateInputByDbAction } from './inputValidation';

test('Number should result in false', () => {
    expect(
        validateInputByDbAction(0, { saying: 'asdfdsafaf', author: 'fdlkjfds', topic: 'fdsa' })
    ).toBe(false);
});

test('No argument should result in false', () => {
    expect(validateInputByDbAction()).toBe(false);
});

test('Wrong string schould result in false', () => {
    expect(
        validateInputByDbAction('wrongstring', {
            saying: 'asdfdsafaf',
            author: 'fdlkjfds',
            topic: 'fdsa'
        })
    ).toBe(false);
});

test('"create" should result in true', () => {
    expect(
        validateInputByDbAction('create', {
            saying: 'asdfdsafaf',
            author: 'fdlkjfds',
            topic: 'fdsa'
        })
    ).toBe(true);
});

test('Short saying should result in false', () => {
    expect(
        validateInputByDbAction('create', { saying: '', author: 'fdlkjfds', topic: 'fdsa' })
    ).toBe(false);
});

test('Long author should result in false', () => {
    expect(
        validateInputByDbAction('create', {
            saying: 'asdfdsafaf',
            author: 'fdlkjfdafdsalkjdsfölkfdslkfdslkfdslkjfdslkjfdskjfdsalkjfdsalkjfdslkjds',
            topic: 'fdsa'
        })
    ).toBe(false);
});

test('number as topic should result in false', () => {
    expect(
        validateInputByDbAction('create', { saying: 'asdfdsafaf', author: 'fdlkjfds', topic: 3 })
    ).toBe(false);
});
