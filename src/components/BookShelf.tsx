import React from 'react';
import { ArrowRight, Bookmark, BookOpen, Columns3, Feather, Sparkles } from 'lucide-react';
import { BOOKS_INFO } from '../utils/bookData';

interface BookShelfProps {
  onSelectBook: (bookId: 'book1' | 'book2', chapterId?: string) => void;
  onOpenComparative: () => void;
  savedBookmarksCount: number;
}

export const BookShelf: React.FC<BookShelfProps> = ({
  onSelectBook, onOpenComparative, savedBookmarksCount,
}) => {
  const manual = BOOKS_INFO.book1;
  const novella = BOOKS_INFO.book2;

  return (
    <div className="relative isolate overflow-hidden bg-[#171311] text-[#F1E7D8]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img src={`${import.meta.env.BASE_URL}sancho-hero.webp`} alt="" className="h-[680px] w-full object-cover object-[center_28%] opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,19,17,0.98)_0%,rgba(23,19,17,0.82)_48%,rgba(23,19,17,0.5)_100%),linear-gradient(180deg,rgba(23,19,17,0.1)_0%,#171311_680px)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#987449]/50 bg-[#33251D]/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D6B77F]">
              <Sparkles className="h-3.5 w-3.5" /> The private edition
            </div>
            <div className="space-y-4">
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-[#B58D5B]">An education in romantic discretion</p>
              <h1 className="max-w-3xl font-display text-5xl font-medium leading-[0.98] tracking-tight text-[#F3E8D7] sm:text-6xl lg:text-7xl">
                Welcome,<br /><span className="italic text-[#D2AD72]">caballero.</span>
              </h1>
              <p className="max-w-xl font-reading-serif text-lg leading-relaxed text-[#C9BBA8] sm:text-xl">
                You've entered Sancho's establishment. A little charm. A little intelligence. A great deal of self-control.
              </p>
              <p className="max-w-xl text-sm leading-7 text-[#A99A88]">
                Explore the Blanco Code through three connected experiences: a satirical manual, a fictional story, and an interactive reader that puts the lessons beside the moments that prove them.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={() => onSelectBook('book1', 'b1-prologue')}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#B9935D] px-6 py-3 text-sm font-bold text-[#211810] shadow-lg shadow-black/20 transition hover:bg-[#D2B47D]">
                Enter the experience <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={onOpenComparative}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#796247] px-6 py-3 text-sm font-semibold text-[#E1D2BC] transition hover:border-[#C7A36B] hover:bg-white/5">
                <Columns3 className="h-4 w-4" /> See how it connects
              </button>
            </div>
            {savedBookmarksCount > 0 && (
              <p className="flex items-center gap-2 text-xs text-[#A99579]">
                <Bookmark className="h-3.5 w-3.5" /> {savedBookmarksCount} saved reading bookmark{savedBookmarksCount === 1 ? '' : 's'}
              </p>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] border border-[#987449]/20" />
            <div className="relative grid grid-cols-[0.9fr_1fr] items-center gap-3 sm:gap-5">
              <div className="rotate-[-5deg] overflow-hidden rounded-xl border border-[#A27C4D]/50 bg-[#30231B] shadow-2xl shadow-black/50">
                <img src={manual.coverImage} alt={manual.title} className="aspect-[3/4] w-full object-cover" />
                <div className="border-t border-[#80613F]/40 px-3 py-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#C7A36B]">Volume I</p>
                  <p className="mt-1 font-display text-lg text-[#F0E0C8]">The Manual</p>
                </div>
              </div>
              <div className="translate-y-8 rotate-[4deg] overflow-hidden rounded-xl border border-[#A27C4D]/50 bg-[#30231B] shadow-2xl shadow-black/50">
                <img src={novella.coverImage} alt={novella.title} className="aspect-[3/4] w-full object-cover" />
                <div className="border-t border-[#80613F]/40 px-3 py-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#C7A36B]">Volume II</p>
                  <p className="mt-1 font-display text-lg text-[#F0E0C8]">The Novella</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#987449]/40 bg-[#241B16] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#D2B47D] shadow-xl">
              <Feather className="h-3.5 w-3.5" /> Two volumes · one questionable education
            </div>
          </div>
        </section>

        <section className="mt-28 space-y-7">
          <div className="flex flex-col justify-between gap-3 border-b border-[#6B533A]/50 pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#B58D5B]">Choose your education</p>
              <h2 className="mt-2 font-display text-3xl text-[#F0E4D2] sm:text-4xl">Three doors. One questionable education.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#A99A88]">Start with the principles, follow the story, or put them side by side.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <article className="group flex flex-col overflow-hidden rounded-xl border border-[#604A35] bg-[#211A16] transition duration-300 hover:-translate-y-1 hover:border-[#B9935D]/80">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#30231B]">
                <img src={manual.coverImage} alt="" className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full border border-[#D0AC72]/50 bg-[#1A1410]/85 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#E2C48F]">Volume I</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#B9935D]">The behavioral guide</p>
                <h3 className="mt-2 font-display text-2xl text-[#F0E4D2]">The Manual</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#BDAF9D]">Twenty-three chapters of the Blanco Code: discretion, boundaries, emotional discipline, and the art of being a welcome guest.</p>
                <button onClick={() => onSelectBook('book1', 'b1-prologue')} className="mt-6 flex min-h-11 items-center justify-between border-t border-[#604A35] pt-4 text-sm font-semibold text-[#D7B77E] transition hover:text-[#F0D6A7]">
                  Explore the Manual <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </article>

            <article className="group flex flex-col overflow-hidden rounded-xl border border-[#604A35] bg-[#211A16] transition duration-300 hover:-translate-y-1 hover:border-[#B9935D]/80">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#30231B]">
                <img src={novella.coverImage} alt="" className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full border border-[#D0AC72]/50 bg-[#1A1410]/85 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#E2C48F]">Volume II</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#B9935D]">The narrative case study</p>
                <h3 className="mt-2 font-display text-2xl text-[#F0E4D2]">The Novella</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#BDAF9D]">Ten chapters of fictionalized Atlanta relationship warfare. Meet Daniel Mercer, Elena Mercer, and Rico Royale, then watch the principles collide with real consequences.</p>
                <button onClick={() => onSelectBook('book2', 'b2-ch1')} className="mt-6 flex min-h-11 items-center justify-between border-t border-[#604A35] pt-4 text-sm font-semibold text-[#D7B77E] transition hover:text-[#F0D6A7]">
                  Enter the story <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </article>

            <article className="group flex flex-col overflow-hidden rounded-xl border border-[#80613F]/70 bg-[linear-gradient(145deg,#30241C,#211A16_65%)] transition duration-300 hover:-translate-y-1 hover:border-[#D0AC72]">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-[#604A35] bg-[#211A16]">
                <img src={`${import.meta.env.BASE_URL}comparative-desk.webp`} alt="Two books open on a candlelit desk" className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171311]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 rounded-full border border-[#A88452]/60 bg-[#1A1410]/85 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#E2C48F]">Theory meets reality</div>
                <div className="hidden">
                  <div className="rounded-lg border border-[#A88452]/60 bg-[#3B2B20] p-4 shadow-xl">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#D7B77E]">Theory</p>
                    <div className="mt-4 h-1 w-4/5 rounded bg-[#C4A16C]/70" />
                    <div className="mt-2 h-1 w-full rounded bg-[#C4A16C]/30" />
                    <div className="mt-2 h-1 w-3/5 rounded bg-[#C4A16C]/30" />
                  </div>
                  <div className="mt-5 rounded-lg border border-[#A88452]/60 bg-[#292C29] p-4 shadow-xl">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#B6C2AE]">Reality</p>
                    <div className="mt-4 h-1 w-4/5 rounded bg-[#B6C2AE]/70" />
                    <div className="mt-2 h-1 w-full rounded bg-[#B6C2AE]/30" />
                    <div className="mt-2 h-1 w-3/5 rounded bg-[#B6C2AE]/30" />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#B9935D]">The connection</p>
                <h3 className="mt-2 font-display text-2xl text-[#F0E4D2]">Comparative Reader</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#BDAF9D]">Put the Manual's principles beside the Novella's scenes. Compare the lesson with the moment it is tested: theory on one side, reality on the other.</p>
                <button onClick={onOpenComparative} className="mt-6 flex min-h-11 items-center justify-between border-t border-[#604A35] pt-4 text-sm font-semibold text-[#D7B77E] transition hover:text-[#F0D6A7]">
                  Compare theory and reality <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-[#6B533A]/60 bg-[#211A16] px-6 py-10 text-center sm:px-12">
          <img src={`${import.meta.env.BASE_URL}sancho-portrait.webp`} alt="Portrait of Sancho Blanco" className="mx-auto mb-6 h-28 w-28 rounded-full border-2 border-[#B9935D]/70 object-cover shadow-xl" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#B9935D]">A final word from your host</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl italic leading-tight text-[#E8D7BD] sm:text-4xl">“The King has the throne. The Queen has the vote. And you, caballero, have an eight o'clock reservation.”</h2>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#8E7B66]">Be a delightful guest. Not a permanent fixture.</p>
        </section>
      </div>
    </div>
  );
};
