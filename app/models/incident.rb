class Incident < ActiveRecord::Base
  self.inheritance_column = nil

  TYPES = %w{ crime neglect light libation }

  def color
    case type
      when 'crime'    then 'FF0000'
      when 'neglect'  then '047235'
      when 'light'    then 'DCDCDC'
      when 'libation' then 'FFFF00'
    end
  end

end
