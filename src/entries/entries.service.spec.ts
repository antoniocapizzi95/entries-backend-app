import { Test, TestingModule } from '@nestjs/testing';
import { EntriesService } from './entries.service';
import { EntryRepository } from '../repository/entry/mongo/entry.repository';

describe('EntriesService', () => {
  let service: EntriesService;
  let mockEntryRepository: Partial<EntryRepository>;

  beforeEach(async () => {
    mockEntryRepository = {
      findAll: jest.fn().mockResolvedValue([
        { id: '1', application_hostname: 'test-app', timestamp: '2021-01-01T00:00:00Z', type: 'WEB' },
        { id: '2', application_hostname: 'test-app2', timestamp: '2021-01-02T00:00:00Z', type: 'MOBILE' }
      ]),
      getCount: jest.fn().mockResolvedValue(2),
      findById: jest.fn().mockResolvedValue({
        id: '1', application_hostname: 'test-app', timestamp: '2021-01-01T00:00:00Z', type: 'WEB'
      }),
      create: jest.fn().mockImplementation((entry) => Promise.resolve({ ...entry, id: '3' })),
      update: jest.fn().mockImplementation((id, entryData) => Promise.resolve({ ...entryData, id })),
      delete: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntriesService,
        { provide: EntryRepository, useValue: mockEntryRepository }
      ],
    }).compile();

    service = module.get<EntriesService>(EntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all entries', async () => {
    const result = await service.findAllEntries(1, 2);
    expect(result.data).toHaveLength(2);
    expect(result.page).toEqual(1);
    expect(result.limit).toEqual(2);
    expect(result.total).toEqual(2);
    expect(mockEntryRepository.findAll).toHaveBeenCalledWith(1, 2);
  });

  it('should find entry by id', async () => {
    const entry = await service.findEntryById('1');
    expect(entry).toBeDefined();
    expect(entry.id).toEqual('1');
    expect(mockEntryRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should create a new entry', async () => {
    const newEntry = { application_hostname: 'new-app', timestamp: '2021-01-03T00:00:00Z', type: 'API', user: 'User1' };
    const savedEntry = await service.createEntry(newEntry);
    expect(savedEntry.id).toBeDefined();
    expect(savedEntry.application_hostname).toEqual('new-app');
    expect(mockEntryRepository.create).toHaveBeenCalled();
  });

  it('should update an entry', async () => {
    const updatedData = { application_hostname: 'updated-app' };
    const updatedEntry = await service.updateEntry('1', updatedData);
    expect(updatedEntry.application_hostname).toEqual('updated-app');
    expect(mockEntryRepository.update).toHaveBeenCalledWith('1', updatedData);
  });

  it('should delete an entry', async () => {
    await service.deleteEntry('1');
    expect(mockEntryRepository.delete).toHaveBeenCalledWith('1');
  });
});