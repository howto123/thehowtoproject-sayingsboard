import { validateInputByDbAction } from './inputValidation';

test('does some test', ()=>{
    console.log("test started");
    expect(validateInputByDbAction(0)).toBe(false);
});

