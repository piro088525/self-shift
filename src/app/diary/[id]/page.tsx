'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DiaryEntry } from '@/types/diary';

export default function DiaryDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/diary/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch entry');
        }
        const data = await response.json();
        setEntry(data);
      } catch (error) {
        console.error('Error fetching diary entry:', error);
        router.push('/diary');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!confirm('この日記を削除してもよろしいですか？')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/diary/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }

      router.push('/diary');
    } catch (error) {
      console.error('Error deleting diary entry:', error);
      alert('日記の削除に失敗しました');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">日記が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/diary"
            className="text-blue-600 hover:text-blue-800"
          >
            ← 日記一覧に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{entry.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{formatDate(entry.date)}</span>
                  {entry.mood && <span className="text-2xl">{entry.mood}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/diary/${entry.id}/edit`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  編集
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors"
                >
                  {isDeleting ? '削除中...' : '削除'}
                </button>
              </div>
            </div>

            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="prose prose-gray max-w-none">
              <p className="whitespace-pre-wrap text-gray-700">{entry.content}</p>
            </div>
          </div>

          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              作成日時: {new Date(entry.createdAt).toLocaleString('ja-JP')}
              {entry.updatedAt !== entry.createdAt && (
                <span className="ml-4">
                  更新日時: {new Date(entry.updatedAt).toLocaleString('ja-JP')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}