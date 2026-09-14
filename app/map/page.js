import Link from 'next/link';
import '../landing.css';
import './threads.css';

const threads = [
  { number: '01', gu: 'કરુણા', name: 'The measure of a person', question: 'How do we recognize care for another person?', steps: [
    { gu: 'વૈષ્ણવ જન તો', en: 'Narsinh Mehta · The True Vaishnav', href: '/verses/narsinh-mehta#poem-1' },
    { gu: 'ઊંચ ન ગણ', en: 'Akha Bhagat · Ram Is Not More in the High-Born', href: '/verses/akha-bhagat#poem-4' },
  ] },
  { number: '02', gu: 'સમજણ', name: 'What knowing asks of us', question: 'What is left when outward ritual is not enough?', steps: [
    { gu: 'તિલક કરતાં ત્રેપન', en: 'Akha Bhagat · Tilak & Ritual', href: '/verses/akha-bhagat#poem-1' },
    { gu: 'સમજણ વિના', en: 'Akha Bhagat · Samjan & Understanding', href: '/verses/akha-bhagat#poem-2' },
  ] },
  { number: '03', gu: 'વિશ્વાસ', name: 'The shape of trust', question: 'What does faith ask us to carry into the world?', steps: [
    { gu: 'મારી હૂંડી', en: 'Narsinh Mehta · My Promissory Note', href: '/verses/narsinh-mehta#poem-2' },
    { gu: 'વૈષ્ણવ જન તો', en: 'Narsinh Mehta · The True Vaishnav', href: '/verses/narsinh-mehta#poem-1' },
  ] },
];

export const metadata = { title: 'Follow a thread — Gujarat', description: 'Move between Gujarati poems through ideas, questions, and voices. An atlas of relationships, without approximate pins.' };

export default function ThreadsPage() {
  return <div className="folio-site threads-page" lang="en">
    <div className="folio-weather"><span>AN OPEN FOLIO FOR GUJARATI LITERATURE</span><span>NO PIN REQUIRED</span></div>
    <header className="folio-header"><Link href="/" className="folio-brand" aria-label="Gujarat, home"><span className="folio-brand-gu">ગુજરાત</span><span className="folio-brand-english">A LIVING LIBRARY<br/>OF GUJARATI VERSE</span></Link><nav aria-label="Main navigation"><Link href="/">મુખપૃષ્ઠ <small>HOME</small></Link><Link href="/verses/narsinh-mehta">વાંચો <small>READ</small></Link><Link href="/map">શોધો <small>THREADS</small></Link></nav><Link className="folio-header-entry" href="/verses/akha-bhagat">OPEN A VERSE <span className="folio-arrow" aria-hidden="true">↗</span></Link></header>
    <main>
      <section className="threads-hero"><div><span className="folio-eyebrow"><i/> AN ATLAS OF RELATIONSHIPS</span><h1><span lang="gu">વાતથી વાત.</span><em>One thought leads to another.</em></h1></div><div className="threads-hero-aside"><p>A poem has no single address. Here, paths connect ideas across voices and centuries. Choose a question and follow the words.</p><div className="threads-hero-key"><span><b/>START WITH A QUESTION</span><span><b/>MOVE BETWEEN VERSES</span><span><b/>MAKE YOUR OWN WAY</span></div></div></section>
      <section className="threads-list" aria-label="Reading threads">{threads.map(thread => <article className="threads-item" key={thread.number}><div className="threads-item-heading"><span className="threads-number">THREAD / {thread.number}</span><h2 lang="gu">{thread.gu}</h2><h3>{thread.name}</h3><p>{thread.question}</p></div><div className="threads-steps">{thread.steps.map((step, index) => <Link href={step.href} key={`${step.href}-${index}`} className="threads-step"><span className="threads-step-index">{String(index+1).padStart(2,'0')}</span><span><strong lang="gu">{step.gu}</strong><small>{step.en}</small></span><span className="folio-arrow" aria-hidden="true">↗</span></Link>)}</div></article>)}</section>
      <div className="threads-outro"><span className="folio-eyebrow"><i/> THE NEXT PAGE IS YOURS</span><p>There is no right order. Begin anywhere, listen closely, and return by another route.</p><Link href="/">BACK TO THE FIRST PAGE <span className="folio-arrow" aria-hidden="true">↗</span></Link></div>
    </main>
    <footer className="threads-footer"><span>ગુજરાત · AN OPEN FOLIO</span><Link href="/">HOME ↑</Link></footer>
  </div>;
}
