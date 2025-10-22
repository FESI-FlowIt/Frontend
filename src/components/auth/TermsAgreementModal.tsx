'use client';

import { useEffect, useMemo, useState } from 'react';

import CloseIcon from '@/assets/icons/close.svg';
import { Button } from '@/components/ui/Button';

import Modal from '../ui/Modal';

type TermsAgreementModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  baseUrl?: string;
  version?: string;
  termsFile?: string;
  privacyFile?: string;
};

type DocState = { html: string; loading: boolean; error: string | null };

function extractBodyInnerHTML(raw: string) {
  const withoutStyle = raw.replace(/<style[\s\S]*?<\/style>/gi, '');
  const withoutScript = withoutStyle.replace(/<script[\s\S]*?<\/script>/gi, '');
  const bodyMatch = withoutScript.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch && bodyMatch[1]) return bodyMatch[1].trim();

  const withoutHead = withoutScript
    .replace(/<\/?html[^>]*>/gi, '')
    .replace(/<\/?head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<\/?body[^>]*>/gi, '')
    .trim();

  return withoutHead;
}

function ScrollBox({
  html,
  loading,
  error,
  emptyText,
}: {
  html: string;
  loading: boolean;
  error: string | null;
  emptyText: string;
}) {
  if (loading) {
    return <div className="bg-line/30 h-[200px] w-[520px] animate-pulse rounded-xl" />;
  }
  if (error) {
    return <div className="text-error text-body-m-16">{emptyText}</div>;
  }

  return (
    <div
      className={[
        'h-200 w-520 overflow-y-auto overscroll-contain',
        'bg-tertiary-01 rounded-xl shadow-sm',
        'px-20',
        'text-text-02 leading-relaxed',
        'prose prose-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2',
        'prose-headings:mt-2 prose-headings:mb-1 prose-h1:text-lg prose-h2:text-base prose-h3:text-base',
      ].join(' ')}
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function TermsAgreementModal({
  isOpen,
  onClose,
  onAgree,
  baseUrl = process.env.NEXT_PUBLIC_EULA_BASE_URL || '',
  version = 'v1',
  termsFile = 'eula_v1.html',
  privacyFile = 'privacy_v1.html',
}: TermsAgreementModalProps) {
  const [terms, setTerms] = useState<DocState>({ html: '', loading: true, error: null });
  const [privacy, setPrivacy] = useState<DocState>({ html: '', loading: true, error: null });

  const termsUrl = useMemo(
    () => [baseUrl.replace(/\/$/, ''), 'eula', version, termsFile].join('/'),
    [baseUrl, version, termsFile],
  );
  const privacyUrl = useMemo(
    () => [baseUrl.replace(/\/$/, ''), 'eula', version, privacyFile].join('/'),
    [baseUrl, version, privacyFile],
  );

  useEffect(() => {
    if (!isOpen) return;

    const load = async (url: string, setter: (s: DocState) => void) => {
      setter({ html: '', loading: true, error: null });
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.text();
        const cleaned = extractBodyInnerHTML(raw);
        setter({ html: cleaned, loading: false, error: null });
      } catch (e: any) {
        setter({ html: '', loading: false, error: e?.message ?? '불러오기 실패' });
      }
    };

    load(termsUrl, setTerms);
    load(privacyUrl, setPrivacy);
  }, [isOpen, termsUrl, privacyUrl]);

  const allLoaded = !terms.loading && !privacy.loading && !terms.error && !privacy.error;

  const handleAgree = () => {
    onAgree();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="eula"
      padding="default"
      rounded="default"
      overlay="default"
    >
      <div className="mb-40 flex items-center justify-between">
        <h2 className="text-display-24 text-text-01">서비스 이용 약관</h2>
        <button
          onClick={onClose}
          className="text-text-03 h-12 w-12 cursor-pointer transition-colors"
        >
          <CloseIcon className="text-Gray_02" width={24} height={24} fill="currentColor" />
        </button>
      </div>

      <section className="mb-40">
        <div className="mb-20 flex items-center gap-6">
          <h3 className="text-body-sb-20 text-text-01">이용 약관</h3>
          <span className="text-primary-01 text-body-sb-20">(필수)</span>
        </div>
        <ScrollBox
          html={terms.html}
          loading={terms.loading}
          error={terms.error}
          emptyText="약관을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
        />
      </section>

      <section className="mb-40">
        <div className="mb-20 flex items-center gap-6">
          <h3 className="text-body-sb-20 text-text-01">개인정보 처리방침</h3>
          <span className="text-primary-01 text-body-sb-20">(필수)</span>
        </div>
        <ScrollBox
          html={privacy.html}
          loading={privacy.loading}
          error={privacy.error}
          emptyText="개인정보 처리방침을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
        />
      </section>

      <div className="flex justify-center">
        <Button
          size="eula"
          variant="default"
          text="default"
          disabled={!allLoaded}
          onClick={handleAgree}
        >
          ✓ 네, 모두 동의합니다.
        </Button>
      </div>
    </Modal>
  );
}
