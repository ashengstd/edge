'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n/settings';

export default function LanguageSwitcher() {
  const t = useTranslations('Index');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    // Current pathname includes the locale, so we need to replace it
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex bg-gray-100 dark:bg-slate-900/50 p-1 rounded-lg border border-gray-200 dark:border-slate-700">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => handleLocaleChange(l)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              locale === l
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            }`}
          >
            {l === 'en' ? 'EN' : '中文'}
          </button>
        ))}
      </div>
    </div>
  );
}
