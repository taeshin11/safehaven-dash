import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SafeHaven Dash — Gold & Safe Haven Currency Dashboard with Fear Gauge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #D4AF37, #2563EB)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: 'white',
            }}
          >
            SH
          </div>
          <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#F1F5F9' }}>
            SafeHaven Dash
          </span>
        </div>
        <p
          style={{
            fontSize: '28px',
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Real-time Gold &amp; Safe Haven Currency Dashboard
        </p>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '40px',
          }}
        >
          {[
            { label: 'Gold', color: '#D4AF37' },
            { label: 'DXY', color: '#2563EB' },
            { label: 'CHF', color: '#22C55E' },
            { label: 'JPY', color: '#F59E0B' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: item.color,
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#64748B' }}>Fear Gauge</span>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#F59E0B',
              padding: '4px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
            }}
          >
            Live
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
