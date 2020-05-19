import IMailTempleteProvider from '../models/IMailTempleteProvider';

class FakeMailTemplateProvider implements IMailTempleteProvider {
    public async parse(): Promise<string> {
        return 'Mail content';
    }
}

export default FakeMailTemplateProvider;
