'use client'
import requestContactStyle from './requestContact.module.scss';
export default function RequestContact() {
  return (
    <form className={requestContactStyle['contact-form']}>
      <div className={requestContactStyle['input']}>
        <input type="text" name="name" placeholder='Name' />
        <input type="text" name="email" placeholder='Email' />
      </div>
      <input type="text" name="subject" placeholder='Subject'/>
      <textarea name="question" placeholder='Your Question'></textarea>
      <button type="submit">submit now</button>
    </form>
  )
}
