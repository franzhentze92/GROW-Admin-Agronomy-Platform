const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

export class GoogleCalendarApi {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAuthUrl(): string {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/callback`;
    const scope = GOOGLE_CALENDAR_SCOPE;
    return `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
    const redirectUri = `${window.location.origin}/auth/callback`;
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(`OAuth error: ${data.error_description || data.error}`);
    this.accessToken = data.access_token;
    return data.access_token;
  }

  async getUpcomingEvents(maxResults: number = 5): Promise<any[]> {
    if (!this.accessToken) throw new Error('Access token not set. Please authenticate first.');
    const now = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
      `maxResults=${maxResults}&orderBy=startTime&singleEvents=true&timeMin=${encodeURIComponent(now)}`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` },
    });
    const data = await response.json();
    if (data.error) throw new Error(`Google Calendar API error: ${data.error.message}`);
    return data.items || [];
  }
}

export const googleCalendarApi = new GoogleCalendarApi(); 