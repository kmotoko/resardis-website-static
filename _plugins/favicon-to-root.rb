#!/usr/bin/env ruby

require 'fileutils'

module Jekyll
    Jekyll::Hooks.register :site, :post_write do |post|
        Dir.glob('assets/favicons/*.*') do |file|
            sourcePath = file
            outputPath = File.join('_site', File.basename(file) )
            FileUtils.cp(sourcePath, outputPath)
        end
        FileUtils.remove_entry_secure('_site/assets/favicons/')
    end
end
