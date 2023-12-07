import { InputError } from 'errors/InputError'

export class Validator {
  constructor(validators = []) {
    this.validators = validators
  }  

  checkValidations = () => this.validators.every((validator) => validator.run())
  
  runValidations = () => this.validators.forEach((validator) => validator.run())

  getErrors = () => {
    const errors = this.validators.map(validator => validator.errors)
    return Object.assign({}, ...errors)
  }

  hasErrors = () => Object.keys(this.getErrors()).length > 0
}

export class IsEmpty {
  constructor(props = {}) {
    this.props = props
  }
  errors = {}

  run = () => {
    this.errors = {}
    Object.keys(this.props).forEach((prop) => this.validate(prop, this.props[prop]))
  }

  validate = (prop, value) => {    
    this.condition(value) && this.errorAction(prop)
    return this.condition(value)
  }

  condition = (value) => String(value).trim() === ''

  errorAction = (prop) => {
    this.errors[prop] = InputError.NOT_EMPTY
  }
}

export class IsNotAddress extends IsEmpty {
  constructor(props = {}) {
    super(props)
  }

  condition = (value) => !/.*\s\d+$/.test(value)

  errorAction = (prop) => {
    this.errors[prop] = InputError.VALID_ADDRESS
  }
}

export class IsNegative extends IsEmpty {
  constructor(props = {}) {
    super(props)
  }
  
  condition = (value) => +value < 0

  errorAction = (prop) => {
    this.errors[prop] = InputError.NEGATIVE_VALUE
  }
}

export class IsNotInRange extends IsEmpty{
  constructor(props = {}, min = 0, max = 0) {
    super(props)    
    this.min = min
    this.max = max
  }

  condition = (value) => value < this.min || value > this.max
  
  errorAction = (prop) => {
    this.errors[prop] = InputError.NOT_VALID_GEO
  }
}
