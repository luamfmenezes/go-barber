import handlebars from 'handlebars';
import IMailTempleteProvider from '../models/IMailTempleteProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import fs from 'fs';

class HandlebarsMailTemplateProvider implements IMailTempleteProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = handlebars.compile(templateFileContent);
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
