import { ImageResponse } from 'next/og';

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #D4AF37',
            borderRadius: 24,
            padding: '12px 16px',
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 800, color: '#F1F5F9', lineHeight: 1 }}>SH</span>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#D4AF37', letterSpacing: 4 }}>
            DASH
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
