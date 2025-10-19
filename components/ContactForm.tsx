"use client";

import { useState, FormEvent } from 'react';
import { Mail, Send } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-gray-700 mb-2">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700 mb-2">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
          placeholder="example@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-gray-700 mb-2">
          件名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
          placeholder="Webアプリケーション開発のご相談"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-gray-700 mb-2">
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors resize-none"
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800">
          お問い合わせありがとうございます。2営業日以内にご返信いたします。
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800">
          送信に失敗しました。お手数ですが、時間をおいて再度お試しください。
        </div>
      )}

      <p className="text-sm text-gray-600">
        送信することで、
        <a href={ROUTES.PRIVACY} className="text-gray-900 hover:text-gray-600 underline" target="_blank" rel="noopener noreferrer">
          プライバシーポリシー
        </a>
        に同意したものとみなします。
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="hover:cursor-pointer inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Mail className="w-4 h-4 animate-pulse" />
            送信中...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            送信する
          </>
        )}
      </button>
    </form>
  );
}
