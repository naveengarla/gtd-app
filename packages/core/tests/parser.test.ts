import { describe, expect, it } from 'vitest';
import { parseQuickAdd } from '../src/parser';

const base = new Date('2023-06-30T09:00:00Z'); // Friday

describe('quick-add parser', () => {
  it('extracts stakeholder and project and tag', () => {
    const r = parseQuickAdd('Meet @Bob about #Alpha +call', base);
    expect(r.stakeholderIds).toEqual(['Bob']);
    expect(r.projectId).toBe('Alpha');
    expect(r.contextTags).toContain('call');
  });

  it('sets waiting status', () => {
    const r = parseQuickAdd('Ping @Sue !waiting', base);
    expect(r.status).toBe('waiting');
  });

  it('parses today', () => {
    const r = parseQuickAdd('Do it today', base);
    expect(r.dueAt?.startsWith('2023-06-30')).toBe(true);
  });

  it('parses tomorrow', () => {
    const r = parseQuickAdd('Do it tomorrow', base);
    expect(r.dueAt?.startsWith('2023-07-01')).toBe(true);
  });

  it('parses weekday next week', () => {
    const r = parseQuickAdd('Call on mon', base);
    expect(r.dueAt?.startsWith('2023-07-03')).toBe(true);
  });

  it('parses in 2d', () => {
    const r = parseQuickAdd('Finish in 2d', base);
    expect(r.dueAt?.startsWith('2023-07-02')).toBe(true);
  });

  it('parses explicit date', () => {
    const r = parseQuickAdd('Report 2023-12-25', base);
    expect(r.dueAt?.startsWith('2023-12-25')).toBe(true);
  });

  it('marks risk', () => {
    const r = parseQuickAdd('Check !risk', base);
    expect(r.contextTags).toContain('risk');
  });

  it('handles multiple tags and stakeholders', () => {
    const r = parseQuickAdd('Discuss @A @B +deep +work', base);
    expect(r.stakeholderIds.length).toBe(2);
    expect(r.contextTags.length).toBe(2);
  });

  it('trims leftover text', () => {
    const r = parseQuickAdd('  Plan   #X  ', base);
    expect(r.title).toBe('Plan');
  });

  it('keeps unknown tokens', () => {
    const r = parseQuickAdd('note $dollar', base);
    expect(r.title).toBe('note $dollar');
  });

  it('ignores unmatched date', () => {
    const r = parseQuickAdd('task someday', base);
    expect(r.dueAt).toBeUndefined();
  });

  it('supports "by" keyword', () => {
    const r = parseQuickAdd('submit report by Tue', base);
    expect(r.dueAt?.startsWith('2023-07-04')).toBe(true);
  });

  it('project at end', () => {
    const r = parseQuickAdd('Do thing #Zeta', base);
    expect(r.projectId).toBe('Zeta');
  });

  it('waiting and date', () => {
    const r = parseQuickAdd('Get reply !waiting tomorrow', base);
    expect(r.status).toBe('waiting');
    expect(r.dueAt?.startsWith('2023-07-01')).toBe(true);
  });

  it('handles uppercase tokens', () => {
    const r = parseQuickAdd('EMAIL @JOE BY FRI #OPS', base);
    expect(r.stakeholderIds[0]).toBe('JOE');
    expect(r.dueAt?.startsWith('2023-07-07')).toBe(true);
  });
});
