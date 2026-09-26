// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../src/pages/network-page';

function controller(): any {
  return {
    __loadHiveNeighbors: vi.fn(),
    __loadHiveNeighborDiscovery: vi.fn(),
    __startHiveNeighborDiscovery: vi.fn(),
    __hiveNeighborsLoading: false,
    __hiveNeighborsError: null,
    __hiveNeighbors: {
      supported: true,
      repeater_enabled: true,
      count: 0,
      neighbors: [],
    },
    __hiveNeighborDiscoveryStarting: false,
    __hiveNeighborDiscovery: {
      supported: true,
      active: false,
      count: 0,
      results: [],
    },
    __hiveNeighborMapMode: 'neighbors',
    __hiveNeighborMapFocusId: '',
    __nodesMapFocusId: '',
    __nodesMapLoading: false,
    __nodesMapContacts: [],
    __networkRangeHours: 48,
    __networkHistory: {
      nodes: {},
      events: [],
      advert_events: [],
      samples: 0,
    },
    __peerActivity: { peers: {}, links: {}, edges: {}, ingress: {} },
    _contacts: [],
    hass: { states: {} },
    __networkHistorySnapshot: vi.fn(() => ({
      nodes: {},
      events: [],
      advert_events: [],
      samples: 0,
    })),
    __readMetricState: vi.fn(() => ({ value: Number.NaN })),
    __networkNeighborId: vi.fn((item) => String(item?.pubkey_prefix || '')),
    __networkSignalFor: vi.fn(() => ({ rssi: null, snr: null, contact: null })),
    __nodeCoords: vi.fn(() => null),
    __nodeId: vi.fn((item) => String(item?.public_key || item?.pubkey_prefix || '')),
    __localRepeaterMapContact: vi.fn(() => null),
    __hiveNeighborLocalMapPoint: vi.fn(() => null),
    __ensureMapLoaded: vi.fn(async () => false),
    __validMapContacts: vi.fn(() => []),
    __removeTraceRouteLayer: vi.fn(),
    __loadLastTrace: vi.fn(() => null),
    __traceRouteData: vi.fn(() => null),
  };
}

describe('hivefw-network-page', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('owns the complete four-column Network DOM with Lit', async () => {
    const page = document.createElement('hivefw-network-page') as any;
    page.controller = controller();
    page.revision = 1;
    document.body.appendChild(page);
    await page.updateComplete;

    expect(page.querySelectorAll('.hive-neighbors-column')).toHaveLength(4);
    expect(page.querySelector('.hive-neighbors-passive')).toBeTruthy();
    expect(page.querySelector('.hive-neighbors-discovery')).toBeTruthy();
    expect(page.querySelector('.hive-network-contacts')).toBeTruthy();
    expect(page.querySelector('hivefw-network-map')).toBeTruthy();
    expect(page.querySelector('.hive-network-analytics')).toBeTruthy();
  });

  it('preserves column and map component identity across data revisions', async () => {
    const page = document.createElement('hivefw-network-page') as any;
    const c = controller();
    page.controller = c;
    page.revision = 1;
    document.body.appendChild(page);
    await page.updateComplete;

    const passive = page.querySelector('.hive-neighbors-passive');
    const discovery = page.querySelector('.hive-neighbors-discovery');
    const contacts = page.querySelector('.hive-network-contacts');
    const map = page.querySelector('hivefw-network-map');

    c.__hiveNeighbors = {
      ...c.__hiveNeighbors,
      count: 1,
      neighbors: [{
        pubkey_prefix: 'abc123',
        name: 'Test Repeater',
        secs_ago: 10,
        snr: -4,
        rssi: -98,
      }],
    };
    page.revision = 2;
    await page.updateComplete;

    expect(page.querySelector('.hive-neighbors-passive')).toBe(passive);
    expect(page.querySelector('.hive-neighbors-discovery')).toBe(discovery);
    expect(page.querySelector('.hive-network-contacts')).toBe(contacts);
    expect(page.querySelector('hivefw-network-map')).toBe(map);
    expect(page.textContent).toContain('Test Repeater');
  });

  it('does not need a hass property update to refresh Network data', async () => {
    const page = document.createElement('hivefw-network-page') as any;
    const c = controller();
    page.controller = c;
    page.revision = 1;
    document.body.appendChild(page);
    await page.updateComplete;

    expect('hass' in page).toBe(false);

    c.__hiveNeighborDiscovery = {
      supported: true,
      active: true,
      count: 0,
      results: [],
      remaining_seconds: 29,
    };
    page.revision = 2;
    await page.updateComplete;

    expect(page.textContent).toContain('29 s restantes');
  });
});
