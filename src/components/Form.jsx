import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .required("Вкажіть своє ім'я"),
  email: Yup.string()
    .trim()
    .email('Введіть коректну електронну адресу')
    .required("Вкажіть електронну пошту"),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .matches(/[A-Za-zА-Яа-яІіЇїЄє]/, 'Додайте до пароля хоча б одну літеру')
    .matches(/[0-9]/, 'Додайте до пароля хоча б одну цифру')
    .required('Створіть пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Паролі не збігаються')
    .required('Повторіть пароль'),
})

function Form() {
  const [submittedName, setSubmittedName] = useState('')

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setSubmittedName(values.name.trim())
      resetForm()
    },
  })

  const fieldError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : ''

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="signup-card" aria-labelledby="form-title">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">ВАШ НОВИЙ ПРОСТІР</p>
        <h1 id="form-title">Створіть акаунт</h1>
        <p className="intro">Заповніть форму, щоб розпочати. Це займе лише хвилину.</p>

        {submittedName && (
          <div className="success-message" role="status">
            <span className="success-icon" aria-hidden="true">✓</span>
            <span>
              <strong>Готово, {submittedName}!</strong>
              <br />
              Ваші дані успішно перевірено.
            </span>
          </div>
        )}

        <form className="signup-form" onSubmit={formik.handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Ім&apos;я</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Наприклад, Олена"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(fieldError('name'))}
              aria-describedby={fieldError('name') ? 'name-error' : undefined}
            />
            {fieldError('name') && <p className="field-error" id="name-error">{fieldError('name')}</p>}
          </div>

          <div className="field">
            <label htmlFor="email">Електронна пошта</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(fieldError('email'))}
              aria-describedby={fieldError('email') ? 'email-error' : undefined}
            />
            {fieldError('email') && <p className="field-error" id="email-error">{fieldError('email')}</p>}
          </div>

          <div className="field">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Щонайменше 8 символів"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(fieldError('password'))}
              aria-describedby={fieldError('password') ? 'password-error' : 'password-hint'}
            />
            {fieldError('password') ? (
              <p className="field-error" id="password-error">{fieldError('password')}</p>
            ) : (
              <p className="field-hint" id="password-hint">Літера та цифра обов&apos;язкові</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Підтвердіть пароль</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Введіть пароль ще раз"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(fieldError('confirmPassword'))}
              aria-describedby={fieldError('confirmPassword') ? 'confirmPassword-error' : undefined}
            />
            {fieldError('confirmPassword') && (
              <p className="field-error" id="confirmPassword-error">{fieldError('confirmPassword')}</p>
            )}
          </div>

          <button className="submit-button" type="submit" disabled={formik.isSubmitting}>
            Створити акаунт
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="terms">Ми дбайливо ставимося до ваших даних.</p>
        <p className="form-note">Усі поля обов&apos;язкові для заповнення</p>
      </section>

      <footer className="page-footer">Просто. Безпечно. Для вас.</footer>
    </main>
  )
}

export default Form
